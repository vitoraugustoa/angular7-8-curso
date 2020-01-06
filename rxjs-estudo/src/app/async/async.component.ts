import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { toArray, map, delay, tap } from 'rxjs/operators';

import { User } from 'src/app/models/User';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  public options$ : Observable<string[]>;
  public user$: Observable<User>;

  constructor() { }

  ngOnInit() {
    this.options$ = Observable.create((observer) => {
      for(let i = 0; i < 10; i++) {
        observer.next(`This is my ${i}th option`);
      }
      observer.complete();
    }).pipe(
    map(s => s+'!'),
    toArray(),
    delay(2000));
    // this.options$.subscribe(s => console.log(s));

    this.user$ = new Observable<User>((observer) => {
      let names = ['Mr. James', 'Mr. John', 'Mr. Ray', 'Ms. Angel'];
      let logins = ['james', 'john', 'ray', 'angel'];
      let i = 0;
      console.log('Here in user$');
      setInterval(() => {
        if(i == 4)
          observer.complete();          
        else {
          observer.next({ login: logins[i], name: names[i] });
        }

        i++;
      }, 2000);
    });

    // this.user$.subscribe(s => console.log(s));
  }

}
