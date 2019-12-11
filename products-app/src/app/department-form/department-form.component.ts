import { Component, OnInit, Output } from '@angular/core';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  public depName: string;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
  }

  save() {;
   this.departmentService.addDepartment({
     name: this.depName
   });
   this.clear();
  }

  clear() {
    this.depName = '';
  }
}
