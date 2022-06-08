import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AddAppointmentComponent } from '../../Trainer/tappointments/modal-add-appointment/add-appointment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAppointmentCComponent } from '../Client/cappointments/modal-add-appointment/add-appointmentc.component';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/services/reviews.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trainerprofile',
  templateUrl: './trainerprofile.component.html',
  styleUrls: ['./trainerprofile.component.scss']
})
export class TrainerprofileComponent implements OnInit {

  id:number;
  trainer:Trainer;
  added:boolean;
  isAuth:boolean =false;
  Role:any;
  found:any;
  feedform:FormGroup;
  url:string=environment.urlServeur;
  starRating = 0; 

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    allDaySlot: false,
    initialView: 'dayGridMonth',

    eventClick: this.addappoint.bind(this),
    
    /*
    function(info) {
      //click: () => this.customFunction()
    
      alert('Event: ' + info.event.id);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('View: ' + info.view.type);
  
      // change the border color just for fun
      info.el.style.borderColor = 'red';
    }*/


    


  };

  constructor(private route: ActivatedRoute,private authService: AuthentificationService,private reviewS:ReviewsService , private modalService: NgbModal,private service: TrainerService,private router: Router, private wishService : WishlistService,private notifyService: NotifyService,private appservice: AppointmentsService) { }


  
  ngOnInit():void{
    this.isAuth= this.authService.isAuthenticated();
    this.Role=this.authService.getRole();
    this.id = this.route.snapshot.params['id'];


    this.service.getTrainer(this.id).subscribe((res:any) => {
      this.trainer = res['data'];
      console.log(res);
      console.log("trainr",this.trainer);

    }, (err:any) => {
      console.log(err)
    });



    this.wishService.verifyadd(this.id).subscribe((res:any) => {
      console.log("dsdsqdc",res.message);
      this.found=res.message;

    }, (err:any) => {
      console.log(err)
    });

    this.feedform = new FormGroup({
      review: new FormControl('', Validators.required),
      stars: new FormControl('', Validators.required),
    });
  



    this.loadEvents();

    this.added;
    

  }


  loadEvents(): void {
    this.appservice.getAvailableAppForTrainer(this.id).subscribe((data:any) => {
      console.log('lef',data)
      this.calendarOptions.events = data['data'].map(
        (evt:any) => {
          return { start: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity+' ' , id : evt.appointment_id}
        })
    })
  }

  get f() {
    return this.feedform.controls;
  }
  addfeedback() {

    if(this.feedform.invalid){
  
      return;
      
      }
    console.log('feedback',this.feedform.value.review)
    console.log('feedback',this.feedform.value.stars)


    return this.reviewS.makeReview(this.id,this.feedform.value.review,this.feedform.value.stars).subscribe((res: any) => {
      Swal.fire({
        title: 'Success!',
        text:   "Your Feedback added successfully!",
        icon: 'success'
        
      }
      ).then((result) => {
        // Reload the Page
        window.location.reload();
      });


    },(err:any)=>{ 

      console.log(err);
      Swal.fire({
        title: 'Error!',
        text:   err.error.message,
        icon: 'error'
        
      });

  });
  }
  addtoList(id:any){

    
    return this.wishService.addtoWishlist(id).subscribe((res: any) => {
      console.log(res);
        //sweetalert message popup
        this.notifyService.showSuccess("Trainer added to your wishlist successfully!", "Wishlist");

        this.ngOnInit();
  
        //this.registerFormC.reset();
  
      
  },(err)=>{ 
    console.log(err);
  
  });
  
  }


  
  removefromList(id:any){

    
    return this.wishService.removefromList(id).subscribe((res: any) => {
      console.log(res);
        //sweetalert message popup
        this.notifyService.showWarning("Trainer removed from your wishlist successfully!", "Wishlist");
  
        //this.registerFormC.reset();
        this.ngOnInit();

      
  },(err)=>{ 
    console.log(err);
  
  });
  
  }


    verifyadded():boolean{

      let rep=false;
     this.wishService.verifyadd(this.route.snapshot.params['id']).subscribe((res: any) => {
        console.log("amine",res);

           rep= true;
    },(err:any)=>{ 
      console.log(err);
    
    });

    return rep;

  }

  addappoint(clickInfo: EventClickArg):void {
    console.log("text",clickInfo.event.id)

    const modalRef =  this.modalService.open(AddAppointmentCComponent);     
    
    modalRef.componentInstance.trainerappointment_id = clickInfo.event.id;  
   }


}
