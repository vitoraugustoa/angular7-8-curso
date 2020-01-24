import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client-interface';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  
  public client: Client = {
    firstName: "",
    lastName: "",
    city: "",
    birth: new Date(),
    gender: "",
    street: "",
    state: "",
    phone1: "",
    phone2: "" ,
    email: "",
    age: 0
  }

  public states = ["SP", "PR", "SC", "PA", "RO", "MA"];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.client);
  }
}
