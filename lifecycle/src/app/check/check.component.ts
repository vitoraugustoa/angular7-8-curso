import { Component, OnInit, OnChanges, DoCheck
  , AfterContentInit, AfterContentChecked, AfterViewChecked
  , AfterViewInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit, OnChanges
, AfterContentInit, AfterContentChecked, AfterViewChecked
, AfterViewChecked, AfterViewInit, OnDestroy  {

  @Input() teste: string;

  public name: string;
  public age: number;

  constructor() {
    console.log('Contructor');
    this.name = '';
    this.age = 0;
  }

  ngOnInit() {
    console.log('OnInit');
  }

  // ngDoCheck() {
  // }

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
