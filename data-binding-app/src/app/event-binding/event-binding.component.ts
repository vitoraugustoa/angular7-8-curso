import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {
  buttonName = 'My button';
  i = 0;
  isDisabled = false;
  spinnerMode = 'determinate';
  selectDisabled = true;
  selectedOption = 'volvo';
  inputValue = '';

  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log('Fui clicado!');
  }

  inc() {
    this.i++;
    this.buttonName = 'It was clicked ' + this.i + ' vezes!';
  }

  disable() {
    this.isDisabled = true;
    this.spinnerMode = 'indeterminate';
    setTimeout(() => {
      this.isDisabled = false;
      this.spinnerMode = 'determinate';
    }, 3000);
  }

  cbChange2(checkbox: MatCheckbox) {
    console.log('Mudei da forma 2!' + checkbox.checked);
    this.selectDisabled = checkbox.checked;
  }

  cbChange1(e: any) {
    console.log('Mudei da forma 1!' + e.checked);
  }

  selectionChange(e: MatSelect) {
    console.log(e.value);
    this.selectedOption = e.value;
  }

  // inputEvent(e: any) {
  //   console.log(e.target.value);
  //   this.inputValue = e.target.value;
  // }
}
