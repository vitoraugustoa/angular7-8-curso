import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for-form',
  templateUrl: './ng-for-form.component.html',
  styleUrls: ['./ng-for-form.component.css']
})
export class NgForFormComponent implements OnInit {

  name: string;
  address: string;
  phone: string;
  city: string;
  age: number;

  cities = [
    {name: 'São paulo', state: 'SP' },
    {name: 'Porto Alegre', state: 'RS'},
    {name: 'Curitiba', state: 'PR'},
    {name: 'Rio de janeiro', state: 'RJ'}
  ];

  clients = [];

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.clients.push({
      name: this.name,
      address: this.address,
      phone: this.phone,
      city: this.city,
      age: this.age
    });

    this.cancel();
    console.log(this.clients);
  }

  cancel() {
    this.name = '';
    this.address = '';
    this.phone = '';
    this.city = '';
    this.age = 0;
  }

  delete(clientIndice: number) {
    this.clients.splice(clientIndice , 1);
  }

}
