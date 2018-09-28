import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  http: HttpClient;
  searchRoute = '/api/items?q=';

  rules: any = [];

  constructor(http: HttpClient) {
    this.http = http;
  }

  search(query): Observable<any> {
    return this.http.get(`${this.searchRoute}${query}`);
  }
}
