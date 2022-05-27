import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/models/appointment.model';
import { Review } from 'src/app/models/review.model';
import { ReviewsService } from 'src/app/services/reviews.service';
import { MustMatch } from '../../auth/_helpers/must-match.validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAppointmentComponent } from './modal-add-appointment/add-appointment.component';
import { LoginComponent } from '../../auth/login/login.component';
import { EditAppointmentComponent } from './modal-edit-appointment/edit-appointment.component';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsTComponent implements OnInit {

  calendarOptions: CalendarOptions = {
     customButtons: {
        myCustomButton: {
          text: '+ Add planning',
          click: this.addappoint.bind(this)
        }
      },
    headerToolbar: {
      left: 'prev,next today myCustomButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    allDaySlot: false,
    initialView: 'dayGridMonth',


  };

  IsmodelShow= false;
  submitted = false;
  user:User;
    photo="/assets/site/img/icon/Ellipse3.png";
    upcomingApp:any;

 
  constructor(private router:Router, private modalService: NgbModal,private auth:AuthentificationService,private formBuilder: FormBuilder,private appservice: AppointmentsService,private reviewservices : ReviewsService) { }

  ngOnInit(): void {




    this.loadEvents();



    this.user = this.auth.getUser()!;
    console.log("test",this.user);
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
        
     } 


     this.appservice.upcomingappOfTrainer().subscribe((data:any) => {
      this.upcomingApp = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })


    
  }



  loadEvents(): void {
    this.appservice.getTrainerApp().subscribe((data:any) => {
      console.log("evisd",data)

      this.calendarOptions.events = data['data'].map(
        (evt:any) => {
          console.log("evid",evt)          
          return { 
  
            date: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity + " " 
          }
        })
    })
    console.log("eventl",this.calendarOptions.events )
  }




    addappoint():void {
      const modalRef =  this.modalService.open(AddAppointmentComponent);       
    }


    openEditForm(id:any){
      const modalRef =  this.modalService.open(EditAppointmentComponent);     
    
      modalRef.componentInstance.inputappointment_id = id;  


    }
}
