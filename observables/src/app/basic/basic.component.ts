import { Component, OnInit } from '@angular/core';
import { Observable, Observer, observable, interval, Subscribable, Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

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
    const myFirstObservable = new Observable((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.error('Deu ruim');
      observer.complete();
    });

    myFirstObservable.subscribe((n: number) => {
      console.log(n);
    },
      (error) => console.log(error),
      () => console.log('Completed'));

    // const timerCount = interval(500);
    // timerCount.subscribe((n) => console.log(n));
    // console.log('after interval');

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

    this.subscrition1 = myIntervalObservable.subscribe(
      (n) => { this.n1 = n },
      (error) => { this.s1 = 'Error: ' + error },
      () => { this.s1 = 'Completed' });

    this.subscrition2 = myIntervalObservable.subscribe(
      (n) => { this.n2 = n },
      (error) => { this.s2 = 'Error: ' + error },
      () => { this.s2 = 'Completed' });

      setTimeout(() => {
        this.subscrition1.unsubscribe();
        this.subscrition2.unsubscribe();
      }, 11000);
  }
}
