import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss','../../../../assets/dashboard/sass/style.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
