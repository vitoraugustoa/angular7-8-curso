import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-data-binding',
  templateUrl: './two-way-data-binding.component.html',
  styleUrls: ['./two-way-data-binding.component.css']
})
export class TwoWayDataBindingComponent implements OnInit {

  name1 = '';
  name2 = '';

  client = {
    firstName: 'Vitor',
    lastName: 'Lopes',
    adress: 'rua teste',
    age: '22'
  };

  constructor() { }

  ngOnInit() {
  }

}
