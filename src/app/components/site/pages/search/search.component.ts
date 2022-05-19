import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialityService } from 'src/app/components/admin/services/speciality.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  trainers:any= [];
  specialities:any=[]

  constructor(public TrainerService:TrainerService, public SpecialityService: SpecialityService, private router:Router) { }

  ngOnInit(): void {
    this.TrainerService.getAll().subscribe((data)=>{
      this.trainers = data;
      console.log(this.trainers);
    })
    this.SpecialityService.getAll().subscribe((data)=>{
      this.specialities = data;
      console.log(this.specialities);
    })
  }
  avalableDATES: any[] = [
    { label:'Mon', hours: [ { id: 1, label:'9:00 - 12:00' , checked: false },{ id: 2, label:'12:00 - 15:00' , checked: true },{ id: 3, label:'15:00 - 17:00' , checked: true },{ id: 5, label:'17:00 - 19:00' , checked: false } ] },

    { label:'Tue', hours: [ { id: 6, label:'9:00 - 12:00' , checked: true },{ id: 7, label:'12:00 - 15:00' , checked: false }, { id: 8, label:'15:00 - 17:00' , checked: true },{ id: 9, label:'17:00 - 19:00' , checked: false }] },
  
    { label:'Wed', hours: [ { id: 10, label:'9:00 - 12:00' , checked: true },{ id: 11, label:'12:00 - 15:00' , checked: false }, { id: 12, label:'15:00 - 17:00' , checked: true },{ id: 13, label:'17:00 - 19:00' , checked: false }] },

    { label:'Thu', hours: [ { id: 14, label:'9:00 - 12:00' , checked: true },{ id: 15, label:'12:00 - 15:00' , checked: false }, { id: 16, label:'15:00 - 17:00' , checked: true },{ id: 17, label:'17:00 - 19:00' , checked: false } ] },

    { label:'Fri', hours: [ { id: 18, label:'9:00 - 12:00' , checked: true },{ id: 19, label:'12:00 - 15:00' , checked: false }, { id: 20, label:'15:00 - 17:00' , checked: true },{ id: 21, label:'17:00 - 19:00' , checked: false }] },

    { label:'Sat', hours: [ { id: 22, label:'9:00 - 12:00' , checked: true },{ id: 23, label:'12:00 - 15:00' , checked: false }, { id: 24, label:'15:00 - 17:00' , checked: true },{ id: 25, label:'17:00 - 19:00' , checked: false }] },

    { label:'Sun', hours: [ { id: 26, label:'9:00 - 12:00' , checked: true },{ id: 27, label:'12:00 - 15:00' , checked: false }, { id: 28, label:'15:00 - 17:00' , checked: true },{ id: 29, label:'17:00 - 19:00' , checked: false }] }

  ];
  

  onChange(brand?: any) {
    this.TrainerService.getTrainersBySpeciality(brand).subscribe(data => {
      this.trainers = data;
    });
}


  


showtrainer(id:number) {
  this.router.navigateByUrl('/trainer');
  this.router.navigate(['/trainer',id]);

}



}
