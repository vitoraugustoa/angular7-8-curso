import { Component, OnInit, OnChanges, DoCheck
  , AfterContentInit, AfterContentChecked, AfterViewChecked
  , AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-child',
  templateUrl: './check-child.component.html',
  styleUrls: ['./check-child.component.css']
})
export class CheckChildComponent implements OnInit, OnChanges
, AfterContentInit, AfterContentChecked, AfterViewChecked
, AfterViewChecked, AfterViewInit, OnDestroy {

  constructor() {
    console.log('   Check Child: constructor');
   }

  ngOnInit() {
    console.log('OnInit');
  }

  ngOnChanges() {
    console.log('OnChanges');
  }

  ngAfterContentInit() {
    console.log('AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked');
  }

  ngOnDestroy() {
    console.log('OnDestroy');
  }

}
