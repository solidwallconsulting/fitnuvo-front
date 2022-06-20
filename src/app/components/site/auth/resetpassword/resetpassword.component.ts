import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SnotifyService} from 'ng-snotify';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm!: FormGroup;


  constructor(public activeModal: NgbActiveModal,private router:Router,private auth:AuthentificationService  , private notify: NotifyService,private formBuilder: FormBuilder
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
    this.auth.sendRestPasswordLink(this.formControl.email.value).subscribe(res => {
      console.log(res);
      Swal.fire({
        title: 'Success!',
        text:   "Check your inbox, we have sent a link to reset email.",
        icon: 'success'
      });

    },(erreur) => {
      console.log(erreur);
      this.notify.showError(erreur.error.message,'Error');


    });
  }

  private handleResponse() {
  
    this.router.navigateByUrl('/');
  }

  private handleErreur(erreur:any) {
    

    // this.erreur = erreur.error.error;
  }

}
