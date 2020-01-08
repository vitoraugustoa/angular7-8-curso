import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect', { static: true }) myrect: ElementRef

  public top: number = 40;
  public left: number = 40;

  constructor() { }

  ngOnInit() {
    let mousedown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    mousedown.subscribe((observer: MouseEvent) => {
      let x = observer.pageX;
      let y = observer.pageY;
      
      mousemove
      .pipe(
        takeUntil(mouseup))
      .subscribe((observer: MouseEvent) => {
        let offsetX = x - observer.pageX;
        let offsetY = y - observer.pageY;

        this.top -= offsetY;
        this.left -= offsetX;

        x = observer.pageX;
        y = observer.pageY;
      });
    });
    
  }

}
