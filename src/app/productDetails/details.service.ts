import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_PATH } from './details.constants';

@Injectable()
export class DetailsService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Requests product information by its ID
   * @param id - product identifier
   * @returns Observable<any> - response data
   */
  getProductDetails(id: string): Observable<any> {
    return this.http.get(`${PRODUCT_PATH}${id}`);
  }
}
