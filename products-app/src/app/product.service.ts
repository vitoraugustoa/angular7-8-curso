import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './models/product.model';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataFromServer: any[] = [
    {
      id: 1,
      name: 'Laptop',
      department_id: 4,
      price: 40,
      description: 'Laptop description'
    },
    {
      id: 2,
      name: 'Shirt',
      department_id: 1,
      price: 10,
      description: 'Shirt description'
    },
    {
      id: 3,
      name: 'Polo',
      department_id: 1,
      price: 50,
      description: 'Polo description'
    },
    {
      id: 4,
      name: 'Mouse',
      department_id: 3,
      price: 40,
      description: 'Mouse description'
    }
  ];

  private products: Product[] = [];
  public onNewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private departmentService: DepartmentService) {
    this.dataFromServer.forEach(p => {
      this.products.push({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        department: departmentService.getDepartmentById(p.department_id)
      });
    })
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    let prod = {...product,id: this.generateNextId()};
    this.products.push(prod);
    console.log(this.products);
    this.onNewProduct.emit(prod);
  }

  generateNextId(): number {
    return this.products.length + 1;
  }
}
