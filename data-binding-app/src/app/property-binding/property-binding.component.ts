import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css']
})
export class PropertyBindingComponent implements OnInit {

  isDisabledButton = false;
  color = 'accent';
  colors = ['primary', 'accent', 'warn', ''];
  idx = 0;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.idx  = this.idx + 1 % this.color.length;
    }, 1000);
  }

}
