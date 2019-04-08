import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import { of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/internal/operators';
import {Recipe} from '../recipe.model';

@Injectable()
export class RecipeService {

  private tags: string[];
  private API_URL = environment.api_url;
  constructor(private http: HttpClient) {

  }

  getAllTags(): Observable<string[]> {
    // const tags = ['poulet', 'poisson', 'pâtes', 'dessert', 'chocolat', 'boeuf', 'végétarien'];
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
        return new Recipe(recipe);
      }));
  }
}
