import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../../auth/register/register.component';
import { MustMatch } from '../../../auth/_helpers/must-match.validator';

@Component({
  selector: 'app-cprofile',
  templateUrl: './cprofile.component.html',
  styleUrls: ['./cprofile.component.scss']
})
export class CprofileComponent implements OnInit {

  //Forms
  profileCform: FormGroup;
  FormEditPass:FormGroup;
  FormImage:FormGroup;
 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";


 
  constructor(private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileCform = this.formBuilder.group({
      firstname: ["", [ Validators.required]],
      secondname: ["", [ Validators.required]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],

    
    }),

    this.FormEditPass = this.formBuilder.group({
      oldpassword: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
 

    
    },
    {
      validator: MustMatch('password', 'repeatpassword')
    }
    ),
    this.FormImage = this.formBuilder.group({

    });

    this.user = this.auth.getUser()!;
    console.log("test",this.user);
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
        
     } 


    
  }

  get formControl() {
    return this.profileCform.controls;
  }


  // Register for a Client
  EditprofileClient(){
    
         //const email = this.formControl.email.value;
         // const password = this.formControl.password.value;

         this.submitted = true;

         if(this.profileCform.invalid){
         
         return;
         
         }
     
        // Initialize Params Object
        var myFormData = new FormData();
      
      // Begin assigning parameters
      
      myFormData.append('firstname', this.formControl.firstname.value);
      myFormData.append('secondname', this.formControl.secondname.value);
      myFormData.append('email', this.formControl.email.value);
      myFormData.append('gender', this.formControl.gender.value);
      myFormData.append('datebirth', this.formControl.datebirth.value);
      myFormData.append('password', this.formControl.password.value);
      myFormData.append('phone', this.formControl.phone.value);
      myFormData.append('adress', this.formControl.adress.value);
      myFormData.append('role', 'client');



      return this.auth.register(myFormData).subscribe((res: any) => {
          console.log(res);
            //sweetalert message popup
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'you has been registered successfully',
              showConfirmButton: false,
              timer: 5000
            })
            //this.registerFormC.reset();

          
      },(err)=>{ 
        console.log(err);

      });
      

    }


    EditPassword(){

    }
    EditImage(){

    }
        
    onresetformA(){
      return this.profileCform.reset();
      
    }


}