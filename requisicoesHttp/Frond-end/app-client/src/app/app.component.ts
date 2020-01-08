import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from './Models/product.model';
import { MatSnackBarConfig, MatSnackBarContainer, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public simpleReqProductsObs$: Observable<Product[]>;
  public productsErrorHandling: Product[];



  constructor(private productService: ProductsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productService.getProducts();
  }

  getProductsWithErrorHandling() {
    this.productService.getProductsError()
      .subscribe(
        (prods) => { this.productsErrorHandling = prods; },
        (error) => {
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_error'];
          // this.snackBar.open(error.error, '', { duration: 2000, panelClass: ['snack_error'] });

          if (error.status == 0)
            this.snackBar.open('Could not connect to the server', '', config);
          else
            this.snackBar.open(error.error, '', config);
        });
  }

  getProductsWithErrorHandlingOK() {
    this.productService.getProductsDelay().subscribe(
      (prods) => {
        this.productsErrorHandling = prods;
        this.snackBar.open('Products successfuly loaded!', '', { duration: 2000, panelClass: ['snack_ok'] });
      },
      (error) => {
        this.snackBar.open(error.error, '', { duration: 2000, panelClass: ['snack_error'] });
      });
  }
}
