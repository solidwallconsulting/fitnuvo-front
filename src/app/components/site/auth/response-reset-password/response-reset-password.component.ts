import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/components/site/services/authentification.service';


@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.scss']
})
export class ResponseResetPasswordComponent implements OnInit {
  formRes!: FormGroup;
   token!:string;
   email!:string;

  constructor( private auth: AuthentificationService,
    private route: ActivatedRoute,private formBuilder: FormBuilder, 
    private router: Router,) {    
  }
    

  ngOnInit(): void {


      this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.token = params.token;
        this.email = params.email;

      }
    );
    
    this.formRes= this.formBuilder.group({
      password: ["",  [Validators.required]],
      password_confirmation: ["",  [Validators.required]],
    });
  }
  get formControl() {
    return this.formRes.controls;
  }

  ResetPassR() {
    // Initialize Params Object
         var myFormDataT = new FormData();
            
        // Begin assigning parameters
    
        myFormDataT.append('token', this.token);
        myFormDataT.append('email', this.email);
        myFormDataT.append('password', this.formControl.password.value);
        myFormDataT.append('password_confirmation',this.formControl.password_confirmation.value);
           


    this.auth.changePassword(myFormDataT).subscribe(next => {
      console.log(next);
      this.handleResponse();
    }, (erreur) => {
      this.handleErreur(erreur);
      console.log(erreur) ;

    });
    
  }

  private handleResponse() {
    this.router.navigateByUrl('/');
  }

  private handleErreur(erreur:any) {
    
  } 

}
