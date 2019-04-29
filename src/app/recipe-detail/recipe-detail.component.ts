import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable} from 'rxjs/index';

import {Recipe} from '../recipe.model';
import {StringUtils} from '../shared/StringUtils';
import {take} from 'rxjs/internal/operators';

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
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeService.getRecipe(params.id)
          .subscribe(recipe => {
            this.recipe = recipe;
            // this.ingredients = this.sanitizer.bypassSecurityTrustHtml(StringUtils.convertToHTML(recipe.ingredients));
            // this.preparation = this.sanitizer.bypassSecurityTrustHtml(StringUtils.convertToHTML(recipe.preparation));
          });
      });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe._id)
      .pipe(take(1))
      .subscribe((value) => {
        this.router.navigate(['/']);
      });
  }

}
