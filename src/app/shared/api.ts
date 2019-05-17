import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/index';
import {tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private _token: string;
  private API_URL = environment.api_url;
  public headers: HttpHeaders = null;

  public set token(value: string) {
    this._token = value;
    this.headers = new HttpHeaders({'token': this._token});
  }

  constructor(public http: HttpClient) {  }

  get(path: string): Observable<any> {
    path = this.cleanPath(path);

    return this.http.get(this.API_URL + path, { 'headers': this.headers });
  }

  put(path: string, body: any) {
    path = this.cleanPath(path);

    return this.http.put(this.API_URL + path, body,{ 'headers': this.headers });
  }

  post(path: string, body: any) {
    path = this.cleanPath(path);

    return this.http.post(this.API_URL + path, body);
  }

  delete(path: string) {
    path = this.cleanPath(path);

    return this.http.delete(this.API_URL + path, { 'headers': this.headers });
  }

  // to be sure that path start with a '/'
  private cleanPath(path: string) {
    if (path.charAt(0) !== '/') {
      return '/' + path;
    } else {
      return path;
    }
  }
}
