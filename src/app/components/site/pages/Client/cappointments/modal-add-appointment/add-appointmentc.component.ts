import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-appointmentc',
  templateUrl: './add-appointmentc.component.html',
  styleUrls: ['./add-appointmentc.component.scss']
})
export class AddAppointmentCComponent implements OnInit {
  @Input() trainerappointment_id: any;

  url:string=environment.urlServeur;
  user:User;
  availableDate:boolean;
  appointment:Appointment=new Appointment();
  photo:string="/assets/site/img/icon/Ellipse3.png";
  constructor(public activeModal: NgbActiveModal,private authService: AuthentificationService,private router : Router, private Appservice: AppointmentsService) { }



  ngOnInit(): void {



    
    this.Appservice.getOneappByIdFromClient(this.trainerappointment_id).subscribe((data:any) => {
      console.log('refch',data)
      this.appointment = data['data'];
    },(err: any) => {
      console.log(err)
    })

    


    this.user=this.authService.getUser();
   

  }


  addApp(){


    console.log("date",this.appointment.appointment_start.slice(0, 5))

      return this.Appservice.addappfromclient(this.appointment.appointment_date,this.appointment.appointment_activity,this.appointment.appointment_start.slice(0, 5),this.appointment.appointment_end.slice(0, 5),this.appointment.appointment_trainer.trainer_id).subscribe((res: any) => {
  
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

        console.log(err);
        Swal.fire({
          title: 'Error!',
          text:   err.error.message,
          icon: 'error'
          
        });
      });


  }

}
