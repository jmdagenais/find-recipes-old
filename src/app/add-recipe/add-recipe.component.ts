import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../recipe.model';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {RecipeService} from '../shared/recipe.service';
import {takeUntil} from 'rxjs/internal/operators';
import {Observable, Subject} from 'rxjs/index';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit, OnDestroy {

  @ViewChild('f') recipeForm: NgForm;
  private tags: string[] = [];
  private unsubscribe: Subject<any> = new Subject();
  // public currentTag: string = '';
  public recipe: Recipe = new Recipe();
  public extraTime: {time: number, name: string} = {time: 0, name: ''};
  public showExtraTime = false;
  public hasError = false;
  public editMode = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((params: Params) => {
        if (params.id) {
          this.editMode = true;
          this.recipeService.getRecipe(params.id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((value: Recipe) => {
              this.recipe = value;
              this.hasError = false;
            }, (error) => {
              this.hasError = true;
            });
        }
      });
  }

  // addTag(tag: string) {
  //   if (tag.length > 0) {
  //     this.tags.push(tag);
  //     this.currentTag = '';
  //   }
  // }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  // onKeyPress(event: KeyboardEvent) {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     this.addTag(this.currentTag);
  //   }
  // }

  submit(form: NgForm) {
    if (form.valid) {
      let observable: Observable<any>;
      // save recipe to the DB
      if (this.editMode) {
        observable = this.recipeService.updateRecipe(this.recipe._id, this.recipe);
      } else {
        observable = this.recipeService.createRecipe(new Recipe(form.value));
      }

      observable
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((val) => {
          form.reset();
          this.tags = [];
          this.router.navigate(['..']);
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
