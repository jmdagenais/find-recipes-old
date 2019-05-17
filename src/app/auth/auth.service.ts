import {Api} from '../shared/api';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = false;

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  constructor(private api: Api) { }

  authenticate(password: string) {
    return this.api.post('/login', {password})
      .pipe(tap((response: {token: string}) => {
        this.api.token = response.token;
        this._isAuthenticated = true;
      }));
  }
}
