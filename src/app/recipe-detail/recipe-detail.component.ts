import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable} from 'rxjs/index';

import {Recipe} from '../recipe.model';
import {StringUtils} from '../shared/StringUtils';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  ingredients: SafeHtml;
  preparation: SafeHtml;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeService.getRecipe(params.id)
          .subscribe(recipe => {
            this.recipe = recipe;
            this.ingredients = this.sanitizer.bypassSecurityTrustHtml(StringUtils.convertToHTML(recipe.ingredients));
            this.preparation = this.sanitizer.bypassSecurityTrustHtml(StringUtils.convertToHTML(recipe.preparation));
          });
      });
  }

}
