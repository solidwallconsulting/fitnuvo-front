import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormV!: FormGroup;
  public submitted = false;
  serverErrors = [];

  constructor(public activeModal: NgbActiveModal , private modalService: NgbModal , private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder) { }

  
  ngOnInit(): void {
    this.loginFormV = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),         
        ]
      ]
    });

    this.serverErrors=[];
 
  }


  openResetPassForm(): void {
    const modalReffff = this.modalService.dismissAll(LoginComponent); 
    const modalRefffff = this.modalService.open(ResetpasswordComponent); 
   }
   
   get formControl() {
    return this.loginFormV.controls;
  }

  onLogin(){
    
         const email = this.formControl.email.value;
         const password = this.formControl.password.value;

         this.submitted = true;

         if(this.loginFormV.invalid){
         
         return;
         
         }
        // console.log(email, password);
        this.auth.login(email,password).subscribe((res:any)=>{
          console.log(res);
          localStorage.removeItem('token');
          localStorage.setItem('token', res.token);
          // redirect to dashboard
          this.router.navigate(['/search']);
        },(err:any)=>{ 
          localStorage.removeItem('token');
      
            this.serverErrors = err.error.message;

          
          console.log(this.serverErrors);
          console.log(err);

        });

      }


      
   
}
