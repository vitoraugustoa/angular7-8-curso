import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-child-child',
  templateUrl: './child-child.component.html',
  styleUrls: ['./child-child.component.css']
})
export class ChildChildComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
    console.log('  Child child (ngOnInit) - ' + this.name);
  }

  ngOnChanges(){
    console.log('  Child child (ngOnChanges) - ' + this.name);
  }

  ngAfterContentInit() {
    console.log('  Child child (ngAfterContentInit) - ' + this.name);
  }

}
