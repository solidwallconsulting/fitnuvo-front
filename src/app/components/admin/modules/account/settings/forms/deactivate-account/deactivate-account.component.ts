import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Admin } from 'src/app/models/adminsModel/admin.model';
import { AuthService } from '../../../../auth';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
})
export class DeactivateAccountComponent {
  profile: Admin = new Admin();
  hasError:boolean;
  constructor(private auth : AuthService,private ngxBootstrapConfirmService: NgxBootstrapConfirmService, private router: Router) {}


  
  ngOnInit(): void {

    this.auth.getUserByToken().subscribe((data:any)=>{
      console.log("dataaa",data['user']);
      this.profile=data['user'];
      console.log("dddd",this.profile);

    });

  }
  saveSettings(check:any) {
    console.log(check)
    if(check===false ) {
      this.hasError=true
    }else {

      let options ={
        title: 'Sure you want to delete this activity?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
      this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
        if (res) {
         

                return this.auth.DesacitveAccountP(this.profile.id).subscribe((res: any) => {

                  localStorage.removeItem('currentUser');
                  this.router.navigate(['/admin/auth/admin/login']);
            
                },(err:any)=>{ 
                  console.log(err);
                });


        } else {
          console.log('Cancel');
        }
      });


    }
  }
}
