import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';
import { publish, refCount, share } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  private n = 0;
  private n1 = 0;
  private n2 = 0;
  private s1: string;
  private s2: string;

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let i = 0;
        console.log('%c Observable Created', 'color: #ff0000');
        
        setInterval(() => {
          i++;
          console.log('%c' + i, 'color:#00FFFF');
          (i == 100) ? observer.complete() : observer.next(i);
        }, 1000);
      });

      // this.usingSubjects();
      // this.usingPublish();
      this.usingShare();
  }


  usingShare() {
    const multicasted = this.myObservable.pipe(share());
    
    // multicasted.connect();

     // Subscriber 1
     this.s1 = 'waiting for interval...';
     setTimeout(() => {
      multicasted.subscribe((number) => {
         this.n1 = number;
         this.s1 = 'OK';
       });
     }, 2000);
     
     // Subscriber 2
     this.s2 = 'waiting for interval...';
     setTimeout(() => {
      multicasted.subscribe((number) => {
         this.n2 = number;
         this.s2 = 'OK';
       });
     }, 4000);
  }

  usingPublish() {
    // const multicasted = this.myObservable.pipe(publish(), refCount());
    const multicasted: ConnectableObservable<number>  = this.myObservable
    .pipe(publish()) as  ConnectableObservable<number>;
    
    // multicasted.connect();

     // Subscriber 1
     this.s1 = 'waiting for interval...';
     setTimeout(() => {
      multicasted.subscribe((number) => {
         this.n1 = number;
         this.s1 = 'OK';
       });
     }, 2000);
     
     // Subscriber 2
     this.s2 = 'waiting for interval...';
     setTimeout(() => {
      multicasted.subscribe((number) => {
         this.n2 = number;
         this.s2 = 'OK';
       });
     }, 4000);
  }

  usingSubjects() {
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);


    // Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(() => {
      subject.subscribe((number) => {
        this.n1 = number;
        this.s1 = 'OK';
      });
    }, 2000);
    
    // Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(() => {
      subject.subscribe((number) => {
        this.n2 = number;
        this.s2 = 'OK';
      });
    }, 4000);
  }

}
