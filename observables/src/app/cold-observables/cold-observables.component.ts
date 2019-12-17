import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  private subscrition1: Subscription;
  private subscrition2: Subscription;
  private n1 = 0;
  private n2 = 0;
  private s1: string;
  private s2: string;

  constructor() { }

  ngOnInit() {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';
   
    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i = 0;
        let id = setInterval(() => {
          i++;
          console.log('From Observable: ' + i);

          if (i == 10)
            observer.complete();
          else if (i % 2 == 0)
            observer.next(i);
        }, 1000);

        return () => {
          clearInterval(id);
        }
      });

    this.s1 = 'waiting for interval...';

    this.subscrition1 = myIntervalObservable.subscribe(
      (n) => { this.n1 = n },
      (error) => { this.s1 = 'Error: ' + error },
      () => { this.s1 = 'Completed' });

    this.s2 = 'waiting for interval...';

    setInterval(() => {
      this.subscrition2 = myIntervalObservable.subscribe(
        (n) => { this.n2 = n },
        (error) => { this.s2 = 'Error: ' + error },
        () => { this.s2 = 'Completed' });
    }, 3000);

      setTimeout(() => {
        this.subscrition1.unsubscribe();
        this.subscrition2.unsubscribe();
      }, 11000);
  }
}
