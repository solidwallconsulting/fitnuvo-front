import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  date="";
  constructor() { }

  ngOnInit(): void {
    this.date=formatDate(new Date(), 'yyyy/MM/dd', 'en');
  }

}
