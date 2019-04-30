import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../recipe.model';
import {Subject, Subscription} from 'rxjs';
import {RecipeService} from '../shared/recipe.service';
import {takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  currentSearch: string;
  selectedTags: string[] = [];
  allTags: string[] = [];
  displayTags: string[] = [];
  recipes: Recipe[] = [];

  private unsubscribe: Subject<any> = new Subject();
  tagsSubscription: Subscription;
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private httpClient: HttpClient) { }

  ngOnInit() {
    // this.tagsSubscription = this.httpClient.get<string[]>('/api/tags')
    //   .subscribe((tags: string[]) => {
    //     this.allTags = tags;
    //   });

    this.recipeService.getAllTags()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((tags: string[]) => {
        this.allTags = tags;
      });

    this.getRecipesByTag();
  }

  onSearchTag(event) {
    if (event.query.length === 0) {
      this.displayTags = [];
      return;
    }
    this.displayTags = this.allTags.filter((tag: string) => {
      return tag.indexOf(event.query) === 0 && this.selectedTags.indexOf(tag) === -1;
    });
  }

  // selectTag(tag: string) {
  //   // check that the tag is not already selected
  //   const idx = this.selectedTags.indexOf(tag);
  //   if (idx === -1) {
  //     this.selectedTags.push(tag);
  //     this.getRecipesByTag();
  //     this.currentSearch = '';
  //     this.displayTags = [];
  //   }
  // }
  //
  // removeTag(tag: string) {
  //   const index = this.selectedTags.indexOf(tag);
  //   this.selectedTags.splice(index, 1);
  //   this.getRecipesByTag();
  // }

  getRecipesByTag() {
    this.recipeService.getRecipes(this.selectedTags)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onSelectTag(tag: string) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.getRecipesByTag();
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
