import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../Models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.css']
})
export class DialogEditProductComponent implements OnInit {

  public product: Product;

  constructor(public dialogRef: MatDialogRef<DialogEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public p: Product) {
      this.product = p;
    }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

}
