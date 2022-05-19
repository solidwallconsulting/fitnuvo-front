import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import Validation from '../../provides/CustomValidators';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  formA: FormGroup;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef,public UsersService:UsersService,private router: Router
    ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.formA = new FormGroup(
      {
      firstname:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      secondname:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      password: new FormControl('', [ Validators.required ]),
      repeatpassword: new FormControl('', [ Validators.required]),
      datebirth: new FormControl('', [ Validators.required]),
      gender: new FormControl('', [ Validators.required]),
      adress: new FormControl('', [ Validators.required])
      }, 

      {
        validators: [Validation.match('password', 'repeatpassword')]
      }     
    );
  }
  

  get f(){
    return this.formA.controls;
  }

  onsavee(){

    if(this.formA.invalid){
                
      return;
      
      }
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);

    console.log(this.formA.value);

    return this.UsersService.create(this.formA.value).subscribe((res: any) => {
      console.log(res);

      this.router.navigate(['/features/users/admins']);
      Swal.fire({
        title: 'Success!',
        text:   "New Administrator added successfully .",
        icon: 'success'
      });

    },(err:any)=>{ 
      console.log(err);
    });
     
  }

  /*saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }*/
}