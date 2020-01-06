import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myreact', { static: false}) myrect: ElementRef

  public top: number = 40;
  public left: number = 40;

  constructor() { }

  ngOnInit() {
  }

}
