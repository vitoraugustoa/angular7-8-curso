import { Component, OnInit } from '@angular/core';
import { Client } from './client_model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  name: string;
  age: number;
  clients: Client[] = [];

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.clients.push({
      name: this.name,
      age: this.age
    });

    this.name = '';
    this.age = 0;
  }

  updateClient(client: Client, indice: number) {
    this.clients[indice].name = client.name;
    this.clients[indice].age = client.age;
  }

  deleteClient(indice: number) {
    this.clients.splice(indice, 1);
  }
}
