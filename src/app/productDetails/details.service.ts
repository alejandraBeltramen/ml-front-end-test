import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DetailsService {
  http: HttpClient;
  PRODUCT_PATH = '/api/items/';

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Requests product information by its ID
   * @param id - product identifier
   * @returns Observable<any> - response data
   */
  getProductDetails(id: string): Observable<any> {
    return this.http.get(`${this.PRODUCT_PATH}${id}`);
  }
}
