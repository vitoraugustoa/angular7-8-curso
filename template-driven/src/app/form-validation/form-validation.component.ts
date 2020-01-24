import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client-interface';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  
  public client: Client = {
    firstName: "",
    lastName: "",
    city: "",
    age: 0,
    birth: new Date(),
    gender: "",
    street: "",
    state: "",
    phone1: "",
    phone2: "" ,
    email: ""
  }
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.client);
  }

}
