import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css']
})

export class ParentChildComponent implements OnInit, AfterViewInit {
  @ViewChild('stopwatch2', {static: false})
   private myTimer: TimerComponent;

   @ViewChild('myP', {static: false})
   private myP: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.myP);
  }

  ngOnInit() {
  }

  start() {
    this.myTimer.start();
  }

  stop() {
    this.myTimer.stop();
  }

  clear() {
    this.myTimer.clear();
  }


}
