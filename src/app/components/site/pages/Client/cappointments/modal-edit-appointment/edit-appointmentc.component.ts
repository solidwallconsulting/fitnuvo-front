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
  selector: 'app-edit-appointmentc',
  templateUrl: './edit-appointmentc.component.html',
  styleUrls: ['./edit-appointmentc.component.scss']
})
export class EditAppointmentCComponent implements OnInit {
  @Input() inputappointment_id: any;
  @Input() trainer_idd: any;

  url:string=environment.urlServeur;
  user:User;
  availableDate:boolean;
  formA:FormGroup;
  appointment:Appointment=new Appointment();
  Availableappointments:Appointment[];
  choosenappoint:Appointment= new Appointment();
  photo:string="/assets/site/img/icon/Ellipse3.png";
  constructor(public activeModal: NgbActiveModal,private authService: AuthentificationService,private router : Router, private Appservice: AppointmentsService) { }



  ngOnInit(): void {



    
    this.Appservice.getOneappByIdFromClient(this.inputappointment_id).subscribe((data:any) => {
      console.log('refch',data)
      this.appointment = data['data'];
    },(err: any) => {
      console.log(err)
    })


    this.Appservice.getAvailableAppForTrainer(this.trainer_idd).subscribe((data:any) => {
      console.log('refchl',data)
      this.Availableappointments = data['data'];
    },(err: any) => {
      console.log("idl",this.appointment.appointment_trainer.trainer_id);
      console.log(err)
    })
    
    this.formA = new FormGroup(
      {
      time_start: new FormControl('', [ Validators.required ]),

      }    
    );

    this.user=this.authService.getUser();
   

  }

  get f(){
    return this.formA.controls;
  }


  editApp(){

    console.log("selc",this.formA.value.time_start)

        

    let formData= new FormData();
    formData.append('appointment_id',this.formA.value.time_start);

      return this.Appservice.editAppFromClient(this.formA.value.time_start,this.inputappointment_id).subscribe((res: any) => {
  
        Swal.fire({
          title: 'Success!',
          text:   "Appointment Updated successfully . You should wait for accepting request from trainer!",
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