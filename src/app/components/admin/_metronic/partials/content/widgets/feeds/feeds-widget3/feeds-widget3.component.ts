import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feeds-widget3',
  templateUrl: './feeds-widget3.component.html',
})
export class FeedsWidget3Component implements OnInit {
  @Input() reviews: any;
  url:string=environment.urlServeur;

  constructor() {}

  ngOnInit(): void {}
}
