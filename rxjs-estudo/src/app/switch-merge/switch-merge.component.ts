import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from '../models/person.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, switchAll, switchMap, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {

  public searchInput: string = "";
  public people$: Observable<Person[]>;
  @ViewChild('searchBy', { static: true }) el: ElementRef;
  private readonly url: string = 'https://jsonplaceholder.typicode.com/users';


  // Não é ideal importar HttpClient injetando diretamente no componente, o certo seria criar um serviço e injetar o serviço
  constructor(private http: HttpClient) { } 

  ngOnInit() {
    // this.firstOption();
    // this.secondOption();
    this.thirdOption();
  }

  filterPeople(searchInput: string): Observable<Person[]> {
    if(searchInput.length === 0)
      return this.http.get<Person[]>(`${this.url}`);
    else
      return this.http.get<Person[]>(`${this.url}?username=${searchInput}`);
  }

  firstOption() {
    fromEvent(this.el.nativeElement, 'keyup')
    .subscribe((observer: KeyboardEvent) => {
      this.filterPeople(this.searchInput)
      .subscribe((result) => {
        console.log(result);
      })
    })
  }

  secondOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    // this.people$ = keyup$.pipe(
    //   map((e) => this.filterPeople(this.searchInput)),
    //   mergeAll()
    //   );
    
   this.people$ = keyup$.pipe(mergeMap( (e) => this.filterPeople(this.searchInput)));
  }

  thirdOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    // this.people$ = keyup$
    //   .pipe( map((e) => this.filterPeople(this.searchInput)))
    //   .pipe(switchAll());

    this.people$ = keyup$.pipe(
      debounceTime(700),
      switchMap(() => this.filterPeople(this.searchInput)));
  }

}
