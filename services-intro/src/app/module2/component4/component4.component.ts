import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../service1.service';
import { Service2 } from 'src/app/service2.service';

@Component({
  selector: 'app-component4',
  templateUrl: './component4.component.html',
  styleUrls: ['./component4.component.css']
})
export class Component4Component implements OnInit {
  public num = 0;
  public texto: string;

  constructor(private myService1: Service1Service, private myService2: Service2) { }

  ngOnInit() {
    this.num = this.myService1.num;
    this.texto = this.myService2.texto;
  }

}
