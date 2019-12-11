import { Injectable } from '@angular/core';
import { Department } from './models/department.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departments: Department[] = [
    {id: 1, name: 'Clothing'},
    {id: 2, name: 'Books'},
    {id: 3, name: 'Eletronics'},
    {id: 4, name: 'Computers'},
  ]

  constructor() { }

  getDepartments(): Department[] {
    return this.departments;
  }

  getDepartmentById(id: number): Department {
    return this.departments.find(d => d.id == id);
  }

  addDepartment(department: Department) {
    this.departments.push({...department, id: this.generateNextId()});
    console.log(this.departments);
  }

  generateNextId(): number {
    return this.departments.length + 1;
  }
}
