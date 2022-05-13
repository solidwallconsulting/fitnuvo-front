import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SnotifyService} from 'ng-snotify';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm!: FormGroup;


  constructor(public activeModal: NgbActiveModal,private router:Router,private auth:AuthentificationService  , private notify: SnotifyService,private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({

      email: ["",  [Validators.email,Validators.required]],

    });
  }
  get formControl() {
    return this.resetForm.controls;
  }


  ResetPass() {
    this.notify.info('wait...', {'timeout': 3330});
    this.auth.sendRestPasswordLink(this.formControl.email.value).subscribe(next => {
      console.log(next);
      this.handleResponse();

    },(erreur) => {
      console.log(erreur);
      this.handleErreur(erreur);


    });
  }

  private handleResponse() {
   
    this.notify.clear();
    this.notify.success('Check your email !', 'Send');
    this.router.navigateByUrl('/');
  }

  private handleErreur(erreur:any) {
    this.notify.clear();
    this.notify.error('Email not found !', 'Error');
    // this.erreur = erreur.error.error;
  }

}
