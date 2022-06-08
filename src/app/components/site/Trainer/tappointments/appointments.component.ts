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
import Tooltip from 'tooltip.js'; 
declare var pdfMake: any;

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
        },
        
        
      },
    
    eventMouseEnter: function(info) {
      console.log('onEventRjvjgjender', info.event._def.title); 

      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.title,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
    },
    eventColor: '#378006',

    eventBackgroundColor:'yellow',

      
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




      
      Swal.fire({  
        title: 'Are you sure want to book?',  
        text: 'You will confirm this appointment!',  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Yes, book it!',  
        cancelButtonText: 'No, keep it'  
      }).then((result) => {  
        if (result.value) {  
          
          
          this.appservice.acceptAppFromTraineer(id).subscribe(
            (res) => {
              
              console.log("res : ",res);

              this.toastr.success('Success!', 'Appointment was confirmed!');
              this.ngOnInit();
      
      
            }, (err: any) => {
              console.log(err)
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Cancelled',  
            'Your appointment is safe :)',  
            'error'  
          )  
        }  
      })  

        

    }


    reject(id:any){

        

      Swal.fire({  
        title: 'Are you sure want to reject?',  
        text: 'You will not be able to recover this appointment!',  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Yes, cancel it!',  
        cancelButtonText: 'No, keep it'  
      }).then((result) => {  
        if (result.value) {  
          
          
          
          this.appservice.rejectAppFromTraineer(id).subscribe(
            (res) => {
              
              console.log("res : ",res);

              this.toastr.success('Success!', 'Appointment was canceled!');
      
      
            }, (err: any) => {
              console.log(err)
            })

            this.ngOnInit();

        } else if (result.dismiss === Swal.DismissReason.cancel) {  
          Swal.fire(  
            'Cancelled',  
            'Your appointment is safe :)',  
            'error'  
          )  
        }  
      })  


  
  
      }

/**
      onEventRender(info: any) { 
        console.log('onEventRender', info.el); 
        const tooltip = new Tooltip(info.el, { 
          title: info.event.title, 
          placement: 'top-end', 
          trigger: 'hover', 
          container: 'body' 
        }); 
      } 

       */



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
