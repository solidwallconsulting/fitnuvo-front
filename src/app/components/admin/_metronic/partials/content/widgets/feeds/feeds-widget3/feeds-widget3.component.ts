import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feeds-widget3',
  templateUrl: './feeds-widget3.component.html',
})
export class FeedsWidget3Component implements OnInit {
  @Input() reviews: any;

  constructor() {}

  ngOnInit(): void {}
}
