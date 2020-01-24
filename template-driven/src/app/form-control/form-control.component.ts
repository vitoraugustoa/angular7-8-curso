import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  public firstName = new FormControl('');
  public lastName = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.firstName.valueChanges.subscribe((name) => {
      console.log(name);
    })
  }

  setFirstName() {
    this.firstName.setValue('Adm');
    console.log(this.firstName.value);
  }
}
