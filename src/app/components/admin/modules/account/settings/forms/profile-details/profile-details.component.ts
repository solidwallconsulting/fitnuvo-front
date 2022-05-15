import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Admin } from 'src/app/components/admin/models/admin.model';
import Validation from 'src/app/components/admin/provides/CustomValidators';
import { UsersService } from 'src/app/components/admin/services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit {
  formP: FormGroup;

  profile: Admin = new Admin();
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

    this.auth.getUserByToken().subscribe((data:any)=>{
      console.log("dataaa",data['user']);
      this.profile=data['user'];
      console.log("dddd",this.profile);

    });

    this.formP = new FormGroup(
      {
        firstname:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
        lastname:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
        email: new FormControl('', [ Validators.required, Validators.email ]),
        phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
        datebirth: new FormControl('', [ Validators.required]),
        gender: new FormControl('', [ Validators.required]),
        adress: new FormControl('', [ Validators.required])
        }, 
    );



  }

  get f(){
    return this.formP.controls;
  }

  onedit(){

    if(this.formP.invalid){
                
      return;
      
      }
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);

    console.log(this.formP.value);

    return this.UsersService.updateInfo(this.formP.value).subscribe((res: any) => {
      console.log(res);

      this.router.navigate(['admin/crafted/account/overview']);
      Swal.fire({
        title: 'Success!',
        text:   "Profile details updated successfully .",
        icon: 'success'
      });

    },(err:any)=>{ 
      console.log(err);
    });
     
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
