import { Component, OnInit } from '@angular/core';
import { Client } from '../Model/client';

@Component({
  selector: 'app-main-lifecycle',
  templateUrl: './main-lifecycle.component.html',
  styleUrls: ['./main-lifecycle.component.css']
})
export class MainLifecycleComponent implements OnInit {

  public foods = ['Rice', 'Beans', 'Pizza'];
  public clients: Client[] = [];
  private editClient = -1 ;

  public name: string;
  public age: number;
  public food: string;

  private randomNumber: number;

  constructor() {
    this.randomNumber = this.generateRandomNumber();
  }

  generateRandomNumber() {
    return Math.round((Math.random() * 1000));
  }

  ngOnInit() {
  }

  save() {
    if (this.editClient === -1) {
      this.clients.push({
        name: this.name,
        age: this.age,
        food: this.food
      });
    } else {
      this.clients[this.editClient].age = this.age;
      this.clients[this.editClient].name = this.name;
      this.clients[this.editClient].food = this.food;
    }

    this.age = null;
    this.name = '';
    this.food = '';
  }

  delete(i: number) {
    this.clients.splice(i, 1);
  }

  edit(i: number) {
    this.age = this.clients[i].age;
    this.name = this.clients[i].name;
    this.food = this.clients[i].food;
    this.editClient = i;
  }

  refresh() {
    location.reload();
  }
}
