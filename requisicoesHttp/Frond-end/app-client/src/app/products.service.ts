import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url = 'https://localhost:44347/api/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductsError(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/error`);
  }

  getProductsDelay(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/delay`);
  }

  getProductsIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/ids`);
  }

  getProductName(id: number): Observable<string> {
    return this.http.get(`${this.url}/NameById/${id}`, { responseType: 'text' });
  }

  saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}`, p);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

  putProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}`, product);
  }
}
