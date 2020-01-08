import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {

  public subscripetionAreActive: boolean = false;
  public subscriptions: Subscription[] = [];
  public unsubscribeAll$: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.checkSubscriptions();
  }

  checkSubscriptions() {
    interval(100).subscribe(() => {
      let active = false;
      this.subscriptions.forEach((x) => {
        if(!x.closed)
          active = true;
      }); 
      this.subscripetionAreActive = active;
    });
  }

  subscribe() {
    this.subscripetionAreActive = true;

    const subscription1 = interval(100)
    .pipe(
      takeUntil(this.unsubscribeAll$)
    )
    .subscribe((i) => {
      console.log(i);
    });

    const subscription2 = fromEvent(document, 'mousemove')
    .pipe(
      takeUntil(this.unsubscribeAll$)
    )
    .subscribe((observer) => {
      console.log(observer);
    });

    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);
  }
  
  unsubscribe() {
    this.unsubscribeAll$.next();
    this.checkSubscriptions();
  }
}
