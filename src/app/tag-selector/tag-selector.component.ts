import {AfterViewInit, Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {Chips} from 'primeng/chips';
import {RecipeService} from '../shared/recipe.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectorComponent),
      multi: true
    }
  ]
})
export class TagSelectorComponent implements AfterViewInit, OnInit, ControlValueAccessor {

  @ViewChild(Chips) selector: Chips;
  textInput: HTMLInputElement = null;
  allTags: string[] = [];
  suggestions: string[] = [];
  selectedTags: string[] = [];
  propagateChange = (_: any) => {};

  constructor(private recipeService: RecipeService) {
    this.recipeService.getAllTags()
      .subscribe((tags: string[]) => {
        this.allTags = tags;
      });
  }

  ngOnInit() {

  }

  selectTag(tag) {
    this.selector.addItem(null, tag);
    this.textInput.value = '';
    this.suggestions = [];
  }

  ngAfterViewInit() {
    this.textInput = document.querySelector('.ui-chips-input-token > input');
    // hack to have selector take full width
    document.querySelector('.ui-chips > ul')['style'].width = '100%';
    fromEvent(this.textInput, 'keyup')
      .pipe(map((e: any) => {
        return e.target.value;
      }))
      .subscribe(value => {
        // console.log(value);
        this.suggestions = this.allTags.filter(tag => {
          return value && tag.indexOf(value) === 0 && (this.selector.value ? this.selector.value.indexOf(tag) === -1 : true);
        });
      });
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      // this.selectedTags = value;
      this.selector.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  changeItemList(evt) {
    this.propagateChange(this.selector.value);
  }

}
