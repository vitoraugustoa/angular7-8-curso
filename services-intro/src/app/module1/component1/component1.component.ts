import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service1.service';
import { Service2 } from 'src/app/service2.service';

@Component({
  selector: 'app-component1',
  //providers: [ Service1 ],
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {
  public num = 0;
  public texto: string;

  constructor(private myService1: Service1, private myService2: Service2) {}

  ngOnInit() {
    this.num = this.myService1.num;
    this.texto = this.myService2.texto;
  }
}
