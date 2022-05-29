import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Validation from 'src/app/components/admin/provides/CustomValidators';
import { Loginresult } from 'src/app/models/loginresult.model';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 //Forms
 registerFormC: FormGroup;
 registerFormT: FormGroup;
 IsmodelShow= false;
 submitted = false;
 result : Loginresult;
 user:User;

  constructor( private modalService: NgbModal, public activeModal: NgbActiveModal,private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder,private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.registerFormC = this.formBuilder.group({
      firstname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      secondname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],
    },
    {
      validators: [Validation.match('password', 'repeatpassword')]
    }   
    ),
    this.registerFormT = this.formBuilder.group({
      firstname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      secondname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      price: ["", [Validators.required]],
    },
    {
      validators: [Validation.match('password', 'repeatpassword')]
    }  
    
    );
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
      myFormData.append('role_id', '4');

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
                      this.modalService.dismissAll();
                      

                      this.auth.login(this.formControlT.email.value,this.formControlT.password.value).subscribe(res =>{
                        if(res.status === 200){
                          console.log("body",res.body)
                          this.result = res.body!;
                          localStorage.setItem('token',JSON.stringify(this.result.token));
                          this.user = new User();
                          /*let role = new Role();
                          user.name=this.result.user.name;
                          role.name= this.result.role.name;*/
                          localStorage.setItem('user', JSON.stringify(this.result.user));
                          localStorage.setItem('ROLE', JSON.stringify(this.result.role));
                          localStorage.setItem('visible', JSON.stringify(this.result.user.is_visible));

                          this.auth.setMenu(this.result.menu);
                          
                          this.notifyService.showSuccess("Welcome to Fitnuvo", "Fitnuvo");
                          this.router.navigate([`/trainerme`]);
                        }
                        },error => {
                          this.notifyService.showError(error.error.message, "Fitnuvo"); 
                      });

                
            },(err)=>{ 
              console.log(err);

            });
            

            

    }

        
    onresetformC(){
      return this.registerFormC.reset();
      
    }
    onresetformT(){
       return this.registerFormT.reset();
    }

    openLoginForm(): void {
      this.modalService.dismissAll(RegisterComponent);
      const modalReff = this.modalService.open(LoginComponent); 
    }
  
     openRegisterForm(): void {
      const modalReff = this.modalService.open(RegisterComponent); 
     }



}
