import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogEditProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    DialogEditProductComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
