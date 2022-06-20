import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Speciality } from 'src/app/models/speciality';
import { User } from 'src/app/models/user.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.component.html',
  styleUrls: ['./editpassword.component.scss']
})
export class EditPassComponent implements OnInit {
  @Input() admin: any;

  url:string=environment.urlServeur;
  formPassA: FormGroup;

  user:User;
  constructor(public activeModal: NgbActiveModal,private authService: AuthentificationService,private router:Router, private UserS:UsersService) { }



  ngOnInit(): void {
    this.formPassA = new FormGroup(
      {
      password: new FormControl('', [ Validators.required ]),
      confirmpassword: new FormControl('', [ Validators.required ]),

      }    
    );


    this.user=this.authService.getUser();
   

  }

  get f(){
    return this.formPassA.controls;
  }

  changepass(){

    if(this.formPassA.invalid){
                
      return;
      
      }




    console.log(this.formPassA.value);


    return this.UserS.changePwdAdmin(this.formPassA.value.password).subscribe((res: any) => {
      console.log(res);

      Swal.fire({
        title: 'Success!',
        text:   "New password created successfully .",
        icon: 'success'
        
      }
      ).then((result) => {
        // Reload the Page
        window.location.reload();
      });


    },(err:any)=>{ 
      console.log(err);
    });
     
  }

}
