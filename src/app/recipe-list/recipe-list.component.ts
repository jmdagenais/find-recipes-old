import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../recipe.model';
import {Subscription} from 'rxjs';
import {RecipeService} from '../shared/recipe.service';

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

  tagsSubscription: Subscription;
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private httpClient: HttpClient) { }

  ngOnInit() {
    // this.tagsSubscription = this.httpClient.get<string[]>('/api/tags')
    //   .subscribe((tags: string[]) => {
    //     this.allTags = tags;
    //   });

    this.tagsSubscription = this.recipeService.getAllTags()
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
    let url = 'http://localhost:3000/api/recipes';
    let query = '';
    // Build the query string
    this.selectedTags.forEach((t: string, index: number) => {
      if (index === 0) {
        query += 'tags=' + t;
      } else {
        query += '&tags=' + t;
      }
    });
    if (query.length > 0) {
      url = url + '?' + query;
    }

    this.recipeSubscription = this.httpClient.get(url)
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
    this.recipeSubscription.unsubscribe();
  }
}
