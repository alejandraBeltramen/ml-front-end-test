import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DetailsService } from './details.service';
import { ProductDetailsModel } from './product-details.model';

@Component({
  selector: 'app-details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  buyLabel = 'Comprar';
  productDescriptionLabel = 'Descripción del producto';
  vendidosLabel = 'vendidos';
  id: string;
  productData: ProductDetailsModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        params => {
          this.getProductDetails(params);
        }
      );
  }

  /**
   * It populates the view with the products associated
   * with the query string
   */
  getProductDetails(param): void {
    this.id = param.params.id;
    this.detailsService
      .getProductDetails(this.id)
      .subscribe(
        response => {
          this.productData = response;

          if (this.productData.item.condition === 'new') {
            this.productData.item.condition = 'Nuevo';
          } else {
            if (this.productData.item.condition === 'used') {
              this.productData.item.condition = 'Usado';
            }
          }
        }
      );
  }
}
