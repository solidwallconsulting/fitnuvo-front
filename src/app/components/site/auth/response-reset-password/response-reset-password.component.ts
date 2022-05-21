import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import Validation from 'src/app/components/admin/provides/CustomValidators';
import { ResetPassword } from 'src/app/models/resetpassword.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.scss']
})
export class ResponseResetPasswordComponent implements OnInit {
  formRes!: FormGroup;
  err = null;
  msg = null;
    userreset: ResetPassword = new ResetPassword();


  constructor( private auth: AuthentificationService,
    private route: ActivatedRoute,private formBuilder: FormBuilder, private notify: SnotifyService,
    private router: Router) {    
  }
    

  ngOnInit(): void {


      this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.userreset.token = params.token;
        this.userreset.email = params.email;

      }
    );
    
    this.formRes= this.formBuilder.group({
      email: ["",  [Validators.email, Validators.required]],
      password: ["",  [Validators.required]],
      password_confirmation: ["",  [Validators.required]],
    },
    {
      validators: [Validation.match('password', 'password_confirmation')]
    }    
    
    );


    
  }
  get f() {
    return this.formRes.controls;
  }

  ResetPassR() {
    // Initialize Params Object

    

    if(this.formRes.invalid){
                
      return;
      
      }

        this.userreset.email=this.f.email.value;
        this.userreset.password=this.f.password.value;
        this.userreset.password_confirmation=this.f.password_confirmation.value;


           


    this.auth.changePassword(this.userreset).subscribe((res:any) => {
      console.log(res);

      this.router.navigateByUrl('/');
      Swal.fire({
        title: 'Success!',
        text:   "Password was changed successfully !",
        icon: 'success'
      });

    }, (erreur) => {
      console.log("bel",this.userreset);
      console.log(erreur) ;
      this.err = erreur.error.error;


    });
    
  }

  private handleResponse() {
    this.router.navigateByUrl('/');
  }

  private handleErreur(erreur:any) {
    
  } 

}
