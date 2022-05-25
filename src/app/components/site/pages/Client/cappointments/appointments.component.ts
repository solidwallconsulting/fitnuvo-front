import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../../auth/register/register.component';
import { MustMatch } from '../../../auth/_helpers/must-match.validator';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/models/appointment.model';
import { Review } from 'src/app/models/review.model';
import { ReviewsService } from 'src/app/services/reviews.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  currentRate = 0;

  appointments:Appointment[];
  myreviews:Review[];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    allDaySlot: false,
    initialView: 'dayGridMonth',


    


  };
  //Forms
  profileCform: FormGroup;
    FormEditPass:FormGroup;
    FormImage:FormGroup;
  IsmodelShow= false;
  submitted = false;
  user:User;
    photo="/assets/site/img/icon/Ellipse3.png";


 
  constructor(private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder,private appservice: AppointmentsService,private reviewservices : ReviewsService) { }

  ngOnInit(): void {


    this.appservice.getClApp().subscribe((data:any) => {
      this.appointments = data['data'];
    },(err: any) => {
      console.log("errapp",err)
    })

    this.reviewservices.getClReviews().subscribe((data:any) => {
      this.myreviews = data['data'];
    },(err: any) => {
      console.log(err)
    })

    this.loadEvents();

    this.profileCform = this.formBuilder.group({
      firstname: ["", [ Validators.required]],
      secondname: ["", [ Validators.required]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],

    
    }),

    this.FormEditPass = this.formBuilder.group({
      oldpassword: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
 

    
    },
    {
      validator: MustMatch('password', 'repeatpassword')
    }
    ),
    this.FormImage = this.formBuilder.group({

    });

    this.user = this.auth.getUser()!;
    console.log("test",this.user);
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
        
     } 


    
  }



  loadEvents(): void {
    this.appservice.getClApp().subscribe((data:any) => {
      this.calendarOptions.events = data['data'].map(
        (evt:any) => {
          return { start: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity+' '+evt.appointment_trainer.first_name +' '+evt.appointment_trainer.last_name, }
        })
    })
  }

  get formControl() {
    return this.profileCform.controls;
  }


  // Register for a Client
  EditprofileClient(){
    
         //const email = this.formControl.email.value;
         // const password = this.formControl.password.value;

         this.submitted = true;

         if(this.profileCform.invalid){
         
         return;
         
         }
     
        // Initialize Params Object
        var myFormData = new FormData();
      
      // Begin assigning parameters
      
      myFormData.append('firstname', this.formControl.firstname.value);
      myFormData.append('secondname', this.formControl.secondname.value);
      myFormData.append('email', this.formControl.email.value);
      myFormData.append('gender', this.formControl.gender.value);
      myFormData.append('datebirth', this.formControl.datebirth.value);
      myFormData.append('password', this.formControl.password.value);
      myFormData.append('phone', this.formControl.phone.value);
      myFormData.append('adress', this.formControl.adress.value);
      myFormData.append('role', 'client');



      return this.auth.register(myFormData).subscribe((res: any) => {
          console.log(res);
            //sweetalert message popup
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'you has been registered successfully',
              showConfirmButton: false,
              timer: 5000
            })
            //this.registerFormC.reset();

          
      },(err)=>{ 
        console.log(err);

      });
      

    }


    EditPassword(){

    }
    EditImage(){

    }
        
    onresetformA(){
      return this.profileCform.reset();
      
    }


    checkavailablity(id:any){

      let i=0;
      for (let element of this.myreviews) {
        if( element.trainer.trainer_id==id) {
          i++;
        }
      };

     return i ;

    }
}
