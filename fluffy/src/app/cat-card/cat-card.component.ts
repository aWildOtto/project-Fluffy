import { Component, OnInit, Input } from '@angular/core';
import { CatData } from '../../model/catModel';

@Component({
  selector: 'cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss'],
  inputs: ['cat']
})
export class CatCardComponent implements OnInit {
  @Input() cat: CatData;
  constructor() { }

  ngOnInit() {
  }

}
