import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable, iif, merge, Subscription } from 'rxjs';
import { Product } from './Models/product.model';
import { MatSnackBarConfig, MatSnackBarContainer, MatSnackBar, MatDialog } from '@angular/material';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';
import { mergeMap, takeWhile, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[]; 

  public simpleReqProductsObs$: Observable<Product[]>;
  public productsErrorHandling: Product[];
  public productsLoading: Product[];
  public bLoading : Boolean = false;
  public productsId: Product[];
  public newlyProducts: Product[] = [];
  public productPriceHelper: number; 
  public productsToDelete: Product[];
  public productsToEdit: Product[];

  constructor(private productService: ProductsService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productService.getProducts();
  }

  getProductsWithErrorHandling() {
    this.subscriptions.push(this.productService.getProductsError()
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
        }));
  }

  getProductsWithErrorHandlingOK() {
    this.subscriptions.push(this.productService.getProductsDelay().subscribe(
      (prods) => {
        this.productsErrorHandling = prods;
        this.snackBar.open('Products successfuly loaded!', '', { duration: 2000, panelClass: ['snack_ok'] });
      },
      (error) => {
        this.snackBar.open(error.error, '', { duration: 2000, panelClass: ['snack_error'] });
      }));
  }

  getProductsLoading() {
    this.bLoading = true;
    this.subscriptions.push(this.productService.getProductsDelay().subscribe(
      (prods) => {
        this.productsLoading = prods;
        this.bLoading = false;
      },
      (error) => {
        this.bLoading = false;
        this.snackBar.open(error.error, '', { duration: 2000, panelClass: ['snack_error'] });
      }));
  }

  getProductsIds() {
    this.subscriptions.push(this.productService.getProductsIds()
    .subscribe((data) => {
      this.productsId = data.map<Product>(id => ({ id: id, name: '', department: '', price: 0 }));
      console.log(this.productsId);
    }));
  }

  loadName(id: number) {
    this.productService.getProductName(id)
    .subscribe((name) => {
      let index = this.productsId.findIndex(p => p.id == id);
      if (index >= 0){
        this.productsId[index].name = name;
      }
    })
  }

  saveProduct(name: string, department: string, price: number) {
    let p: Product = { name: name, department: department, price: this.productPriceHelper };
    console.log(p);
    this.subscriptions.push(this.productService.saveProduct(p)
    .subscribe(
    (data: Product) => {
      console.log(data);
      this.newlyProducts.push(p);
      this.productPriceHelper = null;
    },
    (error) => {
      this.snackBar.open(error.message, '', { duration: 2000, panelClass: ['snack_error'] });
    }));
  }

  loadProductsToDelete() {
    this.subscriptions.push(this.productService.getProducts()
      .subscribe((products) => {
        this.productsToDelete = products;
      }));
  }

  deleteProduct(p: Product) {
    this.subscriptions.push(this.productService.deleteProduct(p.id)
      .subscribe(
      (data) => {
        let index = this.productsToDelete.findIndex(p => p.id == p.id);
        if (index >= 0)
          this.productsToDelete.splice(index , 1);
      },
      (error) => {
        this.snackBar.open(error.message, '', { duration: 2000, panelClass: ['snack_error'] });
      }));
  }

  loadProductsToEdit() {
    this.subscriptions.push(this.productService.getProducts()
    .subscribe((products) => {
      this.productsToEdit = products;
    }))
  }

  editProduct(product: Product) {
    let newProduct: Product = { ...product };
    const dialogRef = this.dialog.open(DialogEditProductComponent, {
      width: '250px',
      data: newProduct 
    });

    this.subscriptions.push(dialogRef.afterClosed().pipe(
      takeWhile((product) => (product)),
      mergeMap((product) =>  { 
        if(product) 
          return this.productService.putProduct(product);
      }))
      .subscribe(
        (result) => {
          let index = this.productsToEdit.findIndex(p => p.id == product.id);
          if(index >= 0)
            this.productsToEdit[index] = result;
        },
        (error) => {
          this.snackBar.open(error.message, '', { duration: 2000, panelClass: ['snack_error'] });
        }
      ));

    // dialogRef.afterClosed()
    // .subscribe((product) => {
    //   if(product) {
    //     this.productService.putProduct(product)
    //       .subscribe(
    //         (result) => {
    //           let index = this.productsToEdit.findIndex(p => p.id == product.id);
    //           if(index >= 0)
    //             this.productsToEdit[index] = result;
    //         },
    //         (error) => {
    //           this.snackBar.open(error.message, '', { duration: 2000, panelClass: ['snack_error'] });
    //         }
    //       );
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
