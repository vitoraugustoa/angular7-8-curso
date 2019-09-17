import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.css']
})
export class StringInterpolationComponent implements OnInit {

  firstname: string = "John";
  person = {
    firstname: "John",
    lastname: "Snow",
    age: 21,
    adress: "rua tal"
  }

  constructor() { }

  ngOnInit() {
  }

}
