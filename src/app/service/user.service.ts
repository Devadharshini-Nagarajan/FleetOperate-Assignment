import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _url = 'http://universities.hipolabs.com/search?country=';
  constructor(private _http: HttpClient) {}

  onSearch(value: string) {
    return this._http.get<any>(this._url + value);
  }
}
