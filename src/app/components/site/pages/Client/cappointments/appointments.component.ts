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
import { EditAppointmentCComponent } from './modal-edit-appointment/edit-appointmentc.component';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  currentRate = 0;

  appointments:Appointment[];
  upcomingApp:Appointment[];
  completedapp:Appointment[];

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

  IsmodelShow= false;
  user:User;



 
  constructor(private router:Router, private auth:AuthentificationService, private toastrService: ToastrService,private NgxBootstrapConfirmService:NgxBootstrapConfirmService ,private modalService: NgbModal,private formBuilder: FormBuilder,private appservice: AppointmentsService,private reviewservices : ReviewsService) { }

  ngOnInit(): void {


    this.appservice.getClApp().subscribe((data:any) => {
      this.appointments = data['data'];
      console.log("chahra",data)
    },(err: any) => {
      console.log("errapp",err)
    })

    this.appservice.upcomingappOfClient().subscribe((data:any) => {
      this.upcomingApp = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })

    this.appservice.completedappOfClient().subscribe((data:any) => {
      this.completedapp = data['data'];
      console.log("chahra",data)
    },(err: any) => {
      console.log("errapp",err)
    })

    this.reviewservices.getClReviews().subscribe((data:any) => {
      this.myreviews = data['data'];
    },(err: any) => {
      console.log(err)
    })

    this.loadEvents();



    this.user = this.auth.getUser()!;
   

    
  }



  loadEvents(): void {
    this.appservice.getClApp().subscribe((data:any) => {
      this.calendarOptions.events = data['data'].map(
        (evt:any) => {
          return { start: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity+' '+evt.appointment_trainer.first_name +' '+evt.appointment_trainer.last_name, }
        })
    })
  }


  

    checkavailablity(id:any){

      let i=0;
      

     return i ;

    }

    openEditForm(id:any,idtrainer:any){
      const modalRef =  this.modalService.open(EditAppointmentCComponent);     
    
      modalRef.componentInstance.inputappointment_id = id;  
      modalRef.componentInstance.trainer_idd = idtrainer;  


    }


    cancelapp(id:any) {

      let options ={
        title: 'Sure you want to cancel this appointment?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
     this.NgxBootstrapConfirmService.confirm(options).then((res: boolean) => {
        if (res) {
  
              this.appservice.cancelappFromClient(id).subscribe(
                (res) => {
                  
                  console.log("res : ",res);

                  this.toastrService.error('Ooh!', 'Your appointment was canceled!');
          
          
                }, (err: HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                  } else {
                    console.log("Server-side error occured.");
                  }
                });
  
        } else {
          console.log('Cancel');
        }
      });

      this.ngOnInit();


    }


}
