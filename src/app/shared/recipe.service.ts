import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import { of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class RecipeService {

  private tags: string[];
  constructor(private http: HttpClient) {

  }

  getAllTags(): Observable<string[]> {
    // const tags = ['poulet', 'poisson', 'pâtes', 'dessert', 'chocolat', 'boeuf', 'végétarien'];
    if (this.tags) {
      return of(this.tags);
    } else {
      return this.http.get(environment.api_url + 'tags')
        .pipe(tap((tags: string[]) => {
          this.tags = tags;
        }));
    }
  }
}
