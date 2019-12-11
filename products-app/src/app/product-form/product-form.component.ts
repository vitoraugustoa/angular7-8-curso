import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department.model';
import { ProductService } from '../product.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public name: string;
  public department: Department;
  public price: number;
  public description: string;
  public departments: Department[];

  constructor(private productService: ProductService,
      private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departments = this.departmentService.getDepartments();
  }

  save() {
    this.productService.addProduct({
      name: this.name,
      department: this.department,
      price: this.price,
      description: this.description
    });

    this.clear();
  }

  clear(){
    this.name = '';
    this.price = 0;
    this.description = '';
    this.department = null;
  }
}
