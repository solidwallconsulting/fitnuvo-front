import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Loginresult } from 'src/app/models/loginresult.model';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotifyService } from 'src/app/services/notify.service';
import { RegisterComponent } from '../register/register.component';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormV!: FormGroup;
  loginFormT:FormGroup;
  public submitted = false;
  public submitted2 = false;

  user:User;
  serverErrors = [];
  result: Loginresult;
  constructor(public activeModal: NgbActiveModal , private modalService: NgbModal , private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder, private notifyService: NotifyService) { }

  
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


    this.loginFormT = this.formBuilder.group({
      emailt: ["", [Validators.email, Validators.required]],
      passwordt: [
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
  get f() {
    return this.loginFormT.controls;
  }

  onLogin(){
    
    const email = this.formControl.email.value;
    const password = this.formControl.password.value;
    this.submitted = true;

    if(this.loginFormV.invalid){
         
      return;
         
    }
     // console.log(email, password);
         /* this.auth.logincl(email,password).subscribe((res:any)=>{
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
        });*/
        this.auth.logincl(email,password).subscribe(res =>{
          if(res.status === 200){
            this.result = res.body!;
            localStorage.setItem('token',JSON.stringify(this.result.token));
            this.user = new User();
            /*let role = new Role();
            user.name=this.result.user.name;
            role.name= this.result.role.name;*/
            localStorage.setItem('user', JSON.stringify(this.result.user));
            localStorage.setItem('ROLE', JSON.stringify(this.result.role));
            this.auth.setMenu(this.result.menu);
            this.modalService.dismissAll(LoginComponent)

            this.notifyService.showSuccess("Welcome to Fitnuvo", "Fitnuvo");
            this.router.navigate([`/user`]);
          }
          },(error:any) => {
            this.notifyService.showError(error.error.message, "Fitnuvo"); 
        });

      }
  loginTrainer(){
    
        const email = this.f.emailt.value;
        const password = this.f.passwordt.value;

        this.submitted2 = true;

        if(this.loginFormT.invalid){
        
        return;
        
        }

        this.auth.logintr(email,password).subscribe(res =>{
          if(res.status === 200){
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
            this.modalService.dismissAll(LoginComponent)

            
            this.notifyService.showSuccess("Welcome to Fitnuvo", "Fitnuvo");
            this.router.navigate([`/trainerme`]);
          }
          },error => {
            this.notifyService.showError(error.error.message, "Fitnuvo"); 
        });




 }


 openRegisterForm(): void {
   this.modalService.dismissAll(LoginComponent)
  const modalReff = this.modalService.open(RegisterComponent); 
 }

      
   
}
