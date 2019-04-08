import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {

  }

}
