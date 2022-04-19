import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  avalableDATES: any[] = [
    { label:'Mon', hours: [ { id: 1, label:'9:00 - 12:00' , checked: false },{ id: 2, label:'12:00 - 15:00' , checked: true }, ] },

    { label:'Tue', hours: [ { id: 3, label:'9:00 - 12:00' , checked: true },{ id: 4, label:'12:00 - 15:00' , checked: false }, ] }
  
  ];

  trainers:any[] = [
    {},{},{},{},{},{}
  ];

}
