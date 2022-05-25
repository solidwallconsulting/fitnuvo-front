import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotifyService } from 'src/app/services/notify.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { AppointmentsService } from 'src/app/services/appointments.service';


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

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    allDaySlot: false,
    initialView: 'dayGridMonth',


    


  };

  constructor(private route: ActivatedRoute,private authService: AuthentificationService,private service: TrainerService,private router: Router, private wishService : WishlistService,private notifyService: NotifyService,private appservice: AppointmentsService) { }


  
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



    this.loadEvents();

    this.added;
    

  }


  loadEvents(): void {
    this.appservice.getAvailableAppForTrainer(this.id).subscribe((data:any) => {
      this.calendarOptions.events = data['data'].map(
        (evt:any) => {
          return { start: evt.appointment_date+'T'+evt.appointment_start,end:evt.appointment_date+'T'+evt.appointment_end ,  title: evt.appointment_activity+' ' }
        })
    })
  }


  addtoList(id:any){

    
    return this.wishService.addtoWishlist(id).subscribe((res: any) => {
      console.log(res);
        //sweetalert message popup
        this.notifyService.showSuccess("Trainer added to your wishlist successfully!", "Wishlist");
  
        //this.registerFormC.reset();
  
      
  },(err)=>{ 
    console.log(err);
  
  });
  
  }


  
  removefromList(id:any){

    
    return this.wishService.removefromList(id).subscribe((res: any) => {
      console.log(res);
        //sweetalert message popup
        this.notifyService.showSuccess("Trainer removed from your wishlist successfully!", "Wishlist");
  
        //this.registerFormC.reset();
  
      
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
}
