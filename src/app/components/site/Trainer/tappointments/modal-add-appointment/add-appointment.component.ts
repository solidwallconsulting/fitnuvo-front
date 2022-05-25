import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Speciality } from 'src/app/models/speciality';
import { User } from 'src/app/models/user.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  url:string=environment.urlServeur;
  formA: FormGroup;

  specialities:any[];
  user:User;
  availableDate:boolean;
  datetmrw:string
  photo:string="/assets/site/img/icon/Ellipse3.png";
  constructor(public activeModal: NgbActiveModal,private authService: AuthentificationService,private router : Router, private Appservice: AppointmentsService,private specService: SpecialityService) { }



  ngOnInit(): void {
    let today=new Date();
    this.datetmrw= new Date(today.setDate( today.getDate() + 1 )).toISOString().slice(0,10);
    console.log('datt',this.datetmrw)
    this.formA = new FormGroup(
      {
      date_app: new FormControl('', [ Validators.required ]),
      time_start: new FormControl('', [ Validators.required ]),
      activity: new FormControl('', [ Validators.required ]),

      }    
    );


    this.user=this.authService.getUser();
    this.specService.getSpeOfTrainer(this.user.id).subscribe((res: any) => {
      console.log(res);
      this.specialities=res['data'];
    },(err:any)=>{ 
      console.log(err);
    });

  }

  get f(){
    return this.formA.controls;
  }

  onsavee(){

    if(this.formA.invalid){
                
      return;
      
      }


      let time_start="";
      let time_end="";

    console.log(this.formA.value);
    if(this.formA.value.time_start=='1'){
    }else if(this.formA.value.time_start=='1'){

      time_start="09:00"
      time_end="10:00"

    }else if(this.formA.value.time_start=='2'){
      time_start="10:00"
      time_end="11:00"
    }else if(this.formA.value.time_start=='3'){
      time_start="11:00"
      time_end="12:00"
    }else if(this.formA.value.time_start=='4'){
      time_start="12:00"
      time_end="13:00"
    }else if(this.formA.value.time_start=='5'){
      time_start="13:00"
      time_end="14:00"
    }else if(this.formA.value.time_start=='6'){
      time_start="14:00"
      time_end="15:00"
    }else if(this.formA.value.time_start=='7'){
      time_start="15:00"
      time_end="16:00"
    }else if(this.formA.value.time_start=='8'){
      time_start="16:00"
      time_end="17:00"
    }else if(this.formA.value.time_start=='9'){
      time_start="17:00"
      time_end="18:00"
    }
    else if(this.formA.value.time_start=='10'){
      time_start="18:00"
      time_end="19:00"
    }
    let formData= new FormData();
    formData.append('date_app',this.formA.value.date_app);
    formData.append('activity',this.formA.value.activity);
    formData.append('time_start',time_start);
    formData.append('time_end',time_end);

    this.availableDate=false;
    return this.Appservice.addappfromtrainer(formData).subscribe((res: any) => {
      console.log(res);

      Swal.fire({
        title: 'Success!',
        text:   "New Appointment created successfully .",
        icon: 'success'
        
      }
      ).then((result) => {
        // Reload the Page
        window.location.reload();
      });


    },(err:any)=>{ 
      this.availableDate=true;
      console.log(err);
    });
     
  }

}
