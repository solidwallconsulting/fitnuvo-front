import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { SpecialityService } from 'src/app/services/speciality.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsDComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete:false,

    },
    
    columns: {
      appointment_id: {
        title: '#Ref',
        editable: false,
        addable: false,
        type: 'number',
      },
      appointment_activity: {
        title: 'Activity',
        type: 'string',
      },
      appointment_date: {
        title: 'Date',
        type: 'string',
      },
      appointment_start: {
        title: 'From',
        type: 'string',
      },
      appointment_end: {
        title: 'To',
        type: 'string',
      },
      appointment_client: {
        title: 'Client',
        valuePrepareFunction: (appointment_client:any) => {
          return appointment_client.first_name + " " +appointment_client.last_name;
          }
      },

      appointment_trainer: {
        title: 'Trainer',
        valuePrepareFunction: (appointment_trainer:any) => {
          return appointment_trainer.first_name + " " +appointment_trainer.last_name;
          }
      },


      appointment_payement_status: {
        title: 'Appointment Status',
        type:'html',
        valuePrepareFunction: (appointment_payement_status:any) => {
          if(appointment_payement_status=='pending') {
            return '<div class="badge badge-light-success fw-bolder">Pending</div>';

          }else {
            return '<div class="badge badge-light-danger fw-bolder">Paid</div>';

          }
        }      
      },
    },
  };
  appointments:any=[]
  alert=false;



  constructor(private service: UsersService, private toastrService: ToastrService,private ngxBootstrapConfirmService: NgxBootstrapConfirmService) {
    //const data = this.service.getAll();
    //this.specialities.load(data['data']);
 
  }

  
  ngOnInit(): void {
    this.service.getAllappointments().subscribe((data:any)=>{
      console.log(data);
      this.appointments = data['data'];

    });
  }


  
 

  





}
