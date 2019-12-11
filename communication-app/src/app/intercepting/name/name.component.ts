import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  private name: string;

  @Input() set setName(name: string) {
    this.name = (name || '');
  }

  get getName(): string {
    return this.name;
  }

  constructor() { }

  ngOnInit() {
  }

}
