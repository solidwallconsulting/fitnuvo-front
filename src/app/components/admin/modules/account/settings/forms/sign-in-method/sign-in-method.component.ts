import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import Validation from 'src/app/components/admin/provides/CustomValidators';
import { UsersService } from 'src/app/components/admin/services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth';

@Component({
  selector: 'app-sign-in-method',
  templateUrl: './sign-in-method.component.html',
})
export class SignInMethodComponent implements OnInit, OnDestroy {
  hasError:boolean;
  formPass: FormGroup;
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,public UsersService:UsersService,private auth : AuthService,private router: Router) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {

    this.formPass = new FormGroup(
      {

      oldpwd: new FormControl('', [ Validators.required ]),
      newpwd: new FormControl('', [ Validators.required ]),
      repeatpassword: new FormControl('', [ Validators.required]),
      }, 

      {
        validators: [Validation.match('newpwd', 'repeatpassword')]
      }     
    );
  }




  togglePasswordForm(show: boolean) {
    this.showChangePasswordForm = show;
  }

  savePassword() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.showChangePasswordForm = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  changepwd() {
    this.hasError=false;

        if(this.formPass.invalid){
                    
          return;
          
          }
          this.isLoading$.next(true);
          setTimeout(() => {
            this.isLoading$.next(false);
            this.cdr.detectChanges();
          }, 1500);

        console.log(this.formPass.value);

        return this.UsersService.changePwd(this.formPass.value).subscribe((res: any) => {
          console.log(res);
          this.showChangePasswordForm = false;

          Swal.fire({
            title: 'Success!',
            text:   "Password updated successfully .",
            icon: 'success'
          });
          this.formPass.reset();

        },(err:any)=>{ 
          if(err.error.message="Password mismatch"){
            this.hasError=true;

          }
          console.log(err);
        });

  }
}
