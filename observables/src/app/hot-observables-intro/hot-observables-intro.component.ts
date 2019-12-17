import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements OnInit {
  @ViewChild('myButton', { static: true }) button: ElementRef;

  private n1 = 0;
  private n2 = 0;
  private s1: string;
  private s2: string;

  constructor() { }

  ngOnInit() {
    let mybtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click');

    mybtnClickObservable.subscribe((event) => console.log('button clicked 1'));
    mybtnClickObservable.subscribe((event) => console.log('button clicked 2'));

    class Producer {
      private myListeners = [];
      private n = 0;
      private id;

      addListener(l) {
        this.myListeners.push(l);
      }

      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log('From producer: ' + this.n);
          for(let l of this.myListeners) {
            l(this.n);
          }
        }, 1000);
      }

      stop() {
        clearInterval(this.id);
      }
    }

    let producer = new Producer();
    producer.start();
    setTimeout(()=> {
      producer.addListener((n) => console.log('From listener 1: ' + n));
      producer.addListener((n) => console.log('From listener 2: ' + n));
    }, 4000);

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener((n) => observer.next(n));
      });

    myHotObservable.subscribe((n) => console.log('From Subscriber 1: ' + n));
    myHotObservable.subscribe((n) => console.log('From Subscriber 2: ' + n));
  }

}
