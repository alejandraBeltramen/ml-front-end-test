import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultsService {
  http: HttpClient;
  SEARCH_PATH = '/api/items?q=';

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Requests all products associated with the string query
   * @param query - string to look for
   * @returns Observable<any> - response data
   */
  searchItems(query: string): Observable<any> {
    return this.http.get(`${this.SEARCH_PATH}${query}`);
  }
}
