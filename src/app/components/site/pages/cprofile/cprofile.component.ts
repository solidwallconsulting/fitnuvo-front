import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../auth/register/register.component';
import { MustMatch } from '../../auth/_helpers/must-match.validator';

@Component({
  selector: 'app-cprofile',
  templateUrl: './cprofile.component.html',
  styleUrls: ['./cprofile.component.scss']
})
export class CprofileComponent implements OnInit {

  //Forms
 registerFormC: FormGroup;
 registerFormT: FormGroup;
 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";


 
  constructor(private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerFormC = this.formBuilder.group({
      firstname: ["", [ Validators.required]],
      secondname: ["", [ Validators.required]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
    
    },
    {
      validator: MustMatch('password', 'repeatpassword')
    }
    ),
    this.registerFormT = this.formBuilder.group({
      firstname: ["", [ Validators.required]],
      secondname: ["", [ Validators.required]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      adress: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      price: ["", [Validators.required]],
    });
    this.user = this.auth.getUser()!;
    console.log(this.user);
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
        
     } 
     this.registerFormC.controls.firstname.setValue(this.user.firstname);
        this.registerFormC.controls.secondname.setValue(this.user.secondname);
        this.registerFormC.controls.email.setValue(this.user.email);
        this.registerFormC.controls.phone.setValue(this.user.phone);
        this.registerFormC.controls.datebirth.setValue(this.user.datebirth);
        this.registerFormC.controls.gender.setValue(this.user.gender);
    
  }

  get formControl() {
    return this.registerFormC.controls;
  }

  get formControlT(){
    return this.registerFormT.controls;
  }
  // Register for a Client
  onRegisterClient(){
    
         //const email = this.formControl.email.value;
         // const password = this.formControl.password.value;

         this.submitted = true;

         if(this.registerFormC.invalid){
         
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
    // Register for a Trainer
    onRegisterTrainer(){
    
                this.submitted = true;

                if(this.registerFormT.invalid){
                
                return;
                
                }

              
              // Initialize Params Object
              var myFormDataT = new FormData();
            
            // Begin assigning parameters
            
                    myFormDataT.append('firstname', this.formControlT.firstname.value);
                    myFormDataT.append('secondname', this.formControlT.secondname.value);
                    myFormDataT.append('email', this.formControlT.email.value);
                    myFormDataT.append('gender', this.formControlT.gender.value);
                    myFormDataT.append('datebirth', this.formControlT.datebirth.value);
                    myFormDataT.append('password', this.formControlT.password.value);
                    myFormDataT.append('phone', this.formControlT.phone.value);
                    myFormDataT.append('adress', this.formControlT.adress.value);
                    myFormDataT.append('experience', this.formControlT.experience.value);
                    myFormDataT.append('price', this.formControlT.price.value);
                    myFormDataT.append('role', 'trainer');



            return this.auth.register(myFormDataT).subscribe((res: any) => {
                console.log(res);
                    //sweetalert message popup
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'you has been registered successfully',
                        showConfirmButton: false,
                        timer: 5000
                      })
                
            },(err)=>{ 
              console.log(err);

            });
            

            

    }

        
    onresetformA(){
      return this.registerFormC.reset();
      
    }
    onresetformB(){
       return this.registerFormT.reset();
    }
    onresetformC(){
      return this.registerFormT.reset();
    }
    

}
