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
import { environment } from 'src/environments/environment';

declare var pdfMake: any;



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  starRating = 0; 

  appointments:Appointment[];
  upcomingApp:Appointment[];
  completedapp:Appointment[];
  oneapp:Appointment=new Appointment();
  url:string=environment.urlServeur;

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

      Swal.fire({  
        title: 'Are you sure want to cancel?',  
        text: 'You will not be able to recover this appointment!',  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Yes, delete it!',  
        cancelButtonText: 'No, keep it'  
      }).then((result) => {  
        if (result.value) {  
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Cancelled',  
            'Your appointment is safe :)',  
            'error'  
          )  
        }  
      })  

   

      this.ngOnInit();


    }





     
  generatePDF(id:any) {

    
    this.appservice.getOneappByIdFromInvoice(id).subscribe((data:any) => {
      let oneapp = data['data'];
      let docDefinition = {
        content: [
          {
            text: 'FITNUVO',
            fontSize: 16,
            alignment: 'center',
            color: '#047886'
          },
          {
            text: 'INVOICE',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            decoration: 'underline',
            color: 'skyblue'
          },
          {
            text: 'Customer Details',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                {
                  text:`${oneapp.appointment_client.first_name} ${oneapp.appointment_client.last_name}`,
                  bold:true
                },
                { text: `${oneapp.appointment_client.email} `},
                { text: `Mobile:+${oneapp.appointment_client.mobile_number} ` },
              ],
              [
                {
                  text: `Date: ${new Date().toLocaleString()}`,
                  alignment: 'right'
                },
                { 
                  text: `Bill No : #${oneapp.appointment_id}`,
                  alignment: 'right'
                }
              ]
              
            ]
          },
          {
            text: 'Order Details',
            style: 'sectionHeader'
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Trainer', 'Price', 'Date', 'Amount'],
                [`${oneapp.appointment_trainer.first_name} ${oneapp.appointment_trainer.last_name} `, `£${oneapp.appointment_trainer.price_trainer} ` ,  `${oneapp.appointment_date} ${oneapp.appointment_start} to ${oneapp.appointment_end} ` , ( `£${oneapp.appointment_amount} ` )],
                [{text: 'Total Amount', colSpan: 3}, {}, {},  `£${oneapp.appointment_amount} ` ]
              ]
            }
          },
          {
            text: 'Additional Details',
            style: 'sectionHeader'
          },
          {
              text: "QR CODE",
              margin: [0, 0 ,0, 15]          
          },
          {
            columns: [
              [{ qr: `${oneapp.appointment_trainer.first_name}`, fit: '50' }],
              [{ text: 'Signature', alignment: 'right', italics: true}],
            ]
          },
          {
            text: 'Terms and Conditions',
            style: 'sectionHeader'
          },
          {
              ul: [
                'Order can be return in max 10 days.',
                'Warrenty of the product will be subject to the manufacturer terms and conditions.',
                'This is system generated invoice.',
              ],
          }
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15,0, 15]          
          }
        }
      };

      pdfMake.createPdf(docDefinition).open();     

    },(err: any) => {
      console.log(err)
    })
    

   

  
  
       
    

  }

  

  NgInit(){
    this.ngOnInit();
  }
  


}
