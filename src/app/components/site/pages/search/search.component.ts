import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialityService } from 'src/app/services/speciality.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  p: number = 1;

  minValue: number =  20;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min:</b> $" + value;
        case LabelType.High:
          return "<b>Max:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  isCheckedExp:boolean;
  isCheckedNameExp:number;
  isCheckedAge:boolean;
  isCheckedNameAge:number;
  isCheckedGender:boolean;
  isCheckedNameGender:string;
  checkboxData = [1,2,3,4];
  checkboxDataGender = ['H','F'];



  trainers:any= [];
  specialities:any=[]
  selected_categories:any=[]
  selected_gender:any=[]
  selected_experience:any=[]
  selected_age:any=[]
  selected_prix:any=[]
  selected_schedule:any=[]
  selected_sort:any=[]




  constructor(public TrainerService:TrainerService, public SpecialityService: SpecialityService,private router: Router) { }

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
  selectedRange:any;
  valueChanged(e:any) {
    this.selectedRange=e.target.value;
  }
  avalableDATES: any[] = [
    { label:'Mon', hours: [ { id: 1, label:'09:00-12:00' , checked: false },{ id: 2, label:'12:00-15:00' , checked: false },{ id: 3, label:'15:00-17:00' , checked: false },{ id: 5, label:'17:00-19:00' , checked: false } ] },

    { label:'Tue', hours: [ { id: 6, label:'09:00-12:00' , checked: false },{ id: 7, label:'12:00-15:00' , checked: false }, { id: 8, label:'15:00-17:00' , checked: false },{ id: 9, label:'17:00-19:00' , checked: false }] },
  
    { label:'Wed', hours: [ { id: 10, label:'09:00-12:00' , checked: false },{ id: 11, label:'12:00-15:00' , checked: false }, { id: 12, label:'15:00-17:00' , checked: false },{ id: 13, label:'17:00-19:00' , checked: false }] },

    { label:'Thu', hours: [ { id: 14, label:'09:00-12:00' , checked: false },{ id: 15, label:'12:00-15:00' , checked: false }, { id: 16, label:'15:00-17:00' , checked: false },{ id: 17, label:'17:00-19:00' , checked: false } ] },

    { label:'Fri', hours: [ { id: 18, label:'09:00-12:00' , checked: false },{ id: 19, label:'12:00-15:00' , checked: false }, { id: 20, label:'15:00-17:00' , checked: false },{ id: 21, label:'17:00-19:00' , checked: false }] },

    { label:'Sat', hours: [ { id: 22, label:'09:00-12:00' , checked: false },{ id: 23, label:'12:00-15:00' , checked: false }, { id: 24, label:'15:00-17:00' , checked: false },{ id: 25, label:'17:00-19:00' , checked: false }] },

    { label:'Sun', hours: [ { id: 26, label:'09:00-12:00' , checked: false },{ id: 27, label:'12:00-15:00' , checked: false }, { id: 28, label:'15:00-17:00' , checked: false },{ id: 29, label:'17:00-19:00' , checked: false }] }

  ];
  

  onChange(brand?: any) {
    this.TrainerService.getTrainersBySpeciality(brand).subscribe(data => {
      this.trainers = data;
    });
}

changebox(id:any,event:any){
  event.stopPropagation();
  for (let i = 0; i < this.avalableDATES.length; i++ ) {
    for (let j = 0; j < this.avalableDATES[i].hours.length; j++ ) {

    if(this.avalableDATES[i].hours[j].id==id) {
      if(this.avalableDATES[i].hours[j].checked==true) {
        this.avalableDATES[i].hours[j].checked=false;
      }else if (this.avalableDATES[i].hours[j].checked==false) {
        this.avalableDATES[i].hours[j].checked=true;

      }
    }
  }


}
}




getFilterData() {
  const pars = this.selected_categories.map((str:any)=>{
    return parseInt(str) ;
  })
  const pars2 = this.selected_gender.map((str:any)=>{
    return str;
  })
  const pars3 = this.selected_experience.map((str:any)=>{
    return str;
  })
  const pars4 = this.selected_age.map((str:any)=>{
    return str;
  })
  const pars5 = this.selected_prix.map((str:any)=>{
    return str;
  })
  const pars6 = this.selected_schedule.map((str:any)=>{
    return str;
  })
  const pars7 = this.selected_sort.map((str:any)=>{
    return str;
  })
  const data = {
    selected_categories : pars,
    selected_gender : pars2,
    selected_experience: pars3,
    selected_age:pars4,
    selected_prix:pars5,
    selected_schedule:pars6,
    selected_sort:pars7

  }

  console.log(data)



  this.TrainerService.getFilteredTrainers(data).subscribe(response=>{
    console.log(response)

    this.trainers=response;
  })
  console.log(data)
}

FilterByCat(event:any) {
  if(event.target.checked) {
    this.selected_categories.push(event.target.id)
  }
   else {
     const id=event.target.id;
     for(let  data of this.selected_categories) {
       if(data  === id ) {
         const index= this.selected_categories.indexOf(data) ;
         console.log(index)
         this.selected_categories.splice(index,1)
       }
     }
   }
}
FilterByExp(event:any) {
    this.isCheckedExp = !this.isCheckedExp;
    this.isCheckedNameExp = event.target.id;
  
  if(event.target.checked) {
    this.selected_experience.push(event.target.id)
  }
   else {
     const id=event.target.id;
     for(let  data of this.selected_experience) {
       if(data  === id ) {
         const index= this.selected_experience.indexOf(data) ;
         console.log(index)
         this.selected_experience.splice(index,1)
       }
     }
   }
}

FilterByGender(event:any) {
  this.isCheckedGender = !this.isCheckedGender;
  this.isCheckedNameGender = event.target.value;

  if(event.target.checked) {
    this.selected_gender.push(event.target.value)
  }
   else {
     const id=event.target.value;
     for(let  data of this.selected_gender) {
       if(data  === id ) {
         const index= this.selected_gender.indexOf(data) ;
         console.log(index)
         this.selected_gender.splice(index,1)
       }
     }
   }
}
FilterByAge(event:any) {
  this.isCheckedAge = !this.isCheckedAge;
  this.isCheckedNameAge = event.target.id;
  if(event.target.checked) {
    this.selected_age.push(event.target.id)
  }
   else {
     const id=event.target.id;
     for(let  data of this.selected_age) {
       if(data  === id ) {
         const index= this.selected_age.indexOf(data) ;
         console.log(index)
         this.selected_age.splice(index,1)
       }
     }
   }
}
scheduleApply(){
    this.selected_schedule.splice(0);

      for (let i = 0; i < this.avalableDATES.length; i++ ) {
        for (let j = 0; j < this.avalableDATES[i].hours.length; j++ ) {

          if(this.avalableDATES[i].hours[j].checked==true) {
            this.selected_schedule.push(this.avalableDATES[i].label+'-'+this.avalableDATES[i].hours[j].label)
          }
        
         }

      }
}

FilterBySort(event:any) {
  if(event.target.value == "0") {
    this.selected_sort.splice(0);
  }
  else if(event.target.value != "") {
    this.selected_sort.splice(0);

    this.selected_sort.push(event.target.value);
  }
  
}

removeSelectedSpeciality(id:any) {
  const index = this.selected_categories.indexOf(id);
  this.selected_categories.splice(index, 1);
}
removeSelectedGender(id:any) {
  const index = this.selected_gender.indexOf(id);
  this.selected_gender.splice(index, 1);
}

removeSelectedAge(id:any) {
  const index = this.selected_age.indexOf(id);
  this.selected_age.splice(index, 1);
}
removeSelectedExp(id:any) {

  const index = this.selected_experience.indexOf(id);
  this.selected_experience.splice(index, 1);
}
removeSelectedPrix() {
  this.selected_prix.splice(0);
}

removeSelectedSort() {
  this.selected_sort.splice(0);
}

removeSelectedSchedule(id:any) {
  const index = this.selected_schedule.indexOf(id);
  this.selected_schedule.splice(index, 1);
}


getPrix(from:any,to:any) {
  if(to == 0 ) {
    return ;
  }else {
    this.selected_prix.splice(0);
    this.selected_prix.push(from+'-'+to);

  console.log(from);
  console.log(to);
  }

}

reset() {
  this.selected_age.splice(0);
  this.selected_gender.splice(0);
  this.selected_experience.splice(0);
  this.selected_categories.splice(0);
  this.selected_prix.splice(0);
  this.selected_schedule.splice(0);
  this.selected_sort.splice(0);
  window.location.reload();


}

/*
searchByCategorie_id(categorie_id:any) {
  console.log(categorie_id);
  this.TrainerService.getTrainersBySpeciality(categorie_id).subscribe(value => {
    console.log(value);
    this.trainers=value;
  });
}
*/

openProfile(id:any){
  this.router.navigate(['/trainer/',id]);

}

ResetSchedule(event:any) {
  this.selected_schedule.splice(0);
}

  



}
