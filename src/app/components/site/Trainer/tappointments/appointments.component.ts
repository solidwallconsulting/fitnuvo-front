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
import { environment } from 'src/environments/environment';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsTComponent implements OnInit {
  p: number = 1;

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
    upcomingapp:any;
    completedapp:any;
    requests:any;
    url:string=environment.urlServeur;


 
  constructor(private router:Router, private modalService: NgbModal,private auth:AuthentificationService,private formBuilder: FormBuilder,private appservice: AppointmentsService,private reviewservices : ReviewsService,private confirmBox: NgxBootstrapConfirmService, private toastr:ToastrService) { }

  ngOnInit(): void {




    this.loadEvents();



    this.user = this.auth.getUser()!;
    console.log("test",this.user);
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
        
     } 


     this.appservice.upcomingappOfTrainer().subscribe((data:any) => {
      this.upcomingapp = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })

    this.appservice.requestsAppOfTrainer().subscribe((data:any) => {
      this.requests = data['data'];
      console.log("sdsd",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



    this.appservice.completedappOfTrainer().subscribe((data:any) => {
      this.completedapp = data['data'];
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
          if(evt.appointment_client!=null) {

            return { 
  
              date: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity + " " + evt.appointment_client.first_name + evt.appointment_client.last_name
            }
          }else {
             return { 
  
            date: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity + " "  
          }

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

    booknow(id:any){

        

    let options ={
      title: 'Sure you want to cancel this appointment?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }
   this.confirmBox.confirm(options).then((res: boolean) => {
      if (res) {

            this.appservice.acceptAppFromTraineer(id).subscribe(
              (res) => {
                
                console.log("res : ",res);

                this.toastr.success('Success!', 'Appointment was confirmed!');
                this.ngOnInit();
        
        
              }, (err: any) => {
                console.log(err)
              });

      } else {
        console.log('Cancel');
      }
    });

    }


    reject(id:any){

        

      let options ={
        title: 'Sure you want to cancel this appointment?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
     this.confirmBox.confirm(options).then((res: boolean) => {
        if (res) {
  
              this.appservice.rejectAppFromTraineer(id).subscribe(
                (res) => {
                  
                  console.log("res : ",res);
  
                  this.toastr.success('Success!', 'Appointment was canceled!');
          
          
                }, (err: any) => {
                  console.log(err)
                })

                this.ngOnInit();

  
        } else {
          console.log('Cancel');
        }
      });
  
      }
}
