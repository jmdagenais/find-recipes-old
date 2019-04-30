import {Injectable, SecurityContext} from '@angular/core';
import {Observable} from 'rxjs/index';
import { of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/internal/operators';
import {Recipe} from '../recipe.model';
import {DomSanitizer} from '@angular/platform-browser';
import {StringUtils} from './StringUtils';

@Injectable()
export class RecipeService {

  private tags: string[];
  private API_URL = environment.api_url;
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {

  }

  getAllTags(): Observable<string[]> {
    if (this.tags) {
      return of(this.tags);
    } else {
      return this.http.get(this.API_URL + '/tags')
        .pipe(tap((tags: string[]) => {
          this.tags = tags;
        }));
    }
  }

  getRecipes(tags: string[]): Observable<Recipe[]> {
    let url = '/recipes';
    let query = '';
    // Build the query string
    tags.forEach((t: string, index: number) => {
      if (index === 0) {
        query += 'tags=' + t;
      } else {
        query += '&tags=' + t;
      }
    });
    if (query.length > 0) {
      url = url + '?' + query;
    }

    return this.http.get(this.API_URL + url)
      .pipe(map((recipes: Recipe[]) => {
        recipes.map(recipe => {
          return new Recipe(recipe);
        });
        return recipes;
      }));
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get(this.API_URL + '/recipes/' + id)
      .pipe(map((recipe: Recipe) => {
        recipe.ingredients = StringUtils.removeHtmlEntities(recipe.ingredients);
        recipe.preparation = StringUtils.removeHtmlEntities(recipe.preparation);
        recipe.tip = StringUtils.removeHtmlEntities(recipe.tip);
        return new Recipe(recipe);
      }));
  }

  createRecipe(recipe: Recipe) {
    this.sanitizeRecipe(recipe);
    this.updateTags(recipe.tags);

    return this.http.post(this.API_URL + '/recipes', recipe);
  }

  updateRecipe(id: string, recipe: Recipe) {
    this.sanitizeRecipe(recipe);
    this.updateTags(recipe.tags);

    return this.http.put(this.API_URL + '/recipes/' + id, recipe);
  }

  deleteRecipe(id: string) {
    return this.http.delete(this.API_URL + '/recipes/' + id);
  }

  /**
   * updated the cached list of tags
   * @param {string[]} tags
   */
  private updateTags(tags: string[]) {
    tags.forEach(tag => {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    });
  }

  private sanitizeRecipe(recipe: Recipe) {
    recipe.name = StringUtils.escapeString(recipe.name);
    recipe.ingredients = StringUtils.escapeString(recipe.ingredients);
    recipe.preparation = StringUtils.escapeString(recipe.preparation);
    recipe.tip = StringUtils.escapeString(recipe.tip);
    if (recipe.extraTime) {
      recipe.extraTime.name = StringUtils.escapeString(recipe.extraTime.name);
    }
  }
}
