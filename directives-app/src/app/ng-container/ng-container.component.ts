import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-container',
  templateUrl: './ng-container.component.html',
  styleUrls: ['./ng-container.component.css']
})
export class NgContainerComponent implements OnInit {

users = [{
  login: 'vitor',
  role: 'admin',
  lastlogin: new Date('2/01/2018')
},
{
  login: 'Lia',
  role: 'user',
  lastlogin: new Date('4/20/2018')
},
{
  login: 'Jhon',
  role: 'admin',
  lastlogin: new Date('4/10/2018')
},
{
  login: 'Michael',
  role: 'user',
  lastlogin: new Date('4/03/2018')
}]

  constructor() { }

  ngOnInit() {
  }

}
