import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResultsService } from './results.service';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-results-component',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  token: string;
  productList: ProductModel[];
  productCategories: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resultsService: ResultsService
  ) {
    this.productList = [];
    this.productCategories = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params: ParamMap) => {
        this.token = params.get('search');

        if (this.token) {
          this.search();
        }
      });
  }

  /**
   * It populates the view with the products associated
   * with the query string
   */
  search(): void {
    this.resultsService
      .searchItems(this.token)
      .subscribe(
        response => {
          this.productList = response.items;
          this.productCategories = response.categories;
        }
      );
  }

  viewProductDetails(product: ProductModel): void {
    this.router.navigate(['/items', product.id]);
  }
}
