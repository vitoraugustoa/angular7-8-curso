import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, AfterContentInit, AfterViewInit } from '@angular/core';
import { LifeCycleEvent } from 'src/app/Model/LifeCycleEvent';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterViewInit {
  @Input() name: string;
  @Input() age: number;
  @Input() food: string;

  public events: LifeCycleEvent[] = [];
  private nextEventId  = 0;
  private colors: string[] = ['accent', 'warn', 'primary'];
  private intervalRef = null;

  constructor() {
    console.log(this.name + ' - constructor');
    this.newEvent('constructor');
    this.intervalRef = setInterval(() => {console.log('interval')}, 2000);
  }

  ngOnInit() {
    console.log(this.name + ' - ngOnInit');
    this.newEvent('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.name + ' - ngOnChanges');
    console.log(changes);
    this.newEvent('ngOnChanges');

    for (let propName in changes) {
      console.log(propName);
      console.log(changes[propName]);
    }

    if (changes.name) {
      console.log('new name: ' + changes.name.currentValue);
      console.log('old name: ' + changes.name.previousValue);
    }
  }

  ngAfterContentInit() {
    console.log(this.name + ' - ngAfertContentInit');
    this.newEvent('ngAfertContentInit');
  }

  ngAfterViewInit() {
    console.log(this.name + ' - ngAfertViewInit');
    this.newEvent('ngAfertViewInit');
  }

  ngOnDestroy() {
    console.log(this.name + ' - ngOnDestroy');
    this.newEvent('ngOnDestroy');
    clearInterval(this.intervalRef);
  }

  newEvent(eventName: string) {
    const eventId = this.nextEventId ++;

    this.events.push({
      id: eventId,
      name: eventName,
      color: this.colors[eventId % this.colors.length]
    });

    setTimeout(() => {
      const idx = this.events.findIndex((e) => e.id === eventId);
      if (idx >= 0) {
        this.events.splice(idx, 1);
      }
    }, 3000 + this.events.length * 2000);
  }
}
