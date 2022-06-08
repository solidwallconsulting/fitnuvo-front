import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
@Injectable()
export class ProfileComponent implements OnInit {
  url:string=environment.urlServeur;

  user:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private toastrService: ToastrService , private router: Router,private ngxBootstrapConfirmService:NgxBootstrapConfirmService) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.user = res['data'];
      }, (err) => {
        console.log(err)
      });



  }

  verifytr(){

     
    let options ={
      title: 'Sure you want to verify this account?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {

            this.service.verifytrainer(this.id).subscribe(
              (res) => {
                
                console.log("res : ",res);

                this.toastrService.success('Success', 'Trainer is verified !');
        
                this.ngOnInit();
        
              }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.");
                }
              });

              this.ngOnInit();


      } else {
        console.log('Cancel');
      }
    });


  }


  unverifytr(){

     
    let options ={
      title: 'Sure you want to unverify this trainer?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {

            this.service.unverifytrainer(this.id).subscribe(
              (res) => {
                
                console.log("res : ",res);

                this.toastrService.error('Ops...', 'Trainer is unverified !');
        
                this.ngOnInit();
        
              }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.");
                }
              });

              this.ngOnInit();


      } else {
        console.log('Cancel');
      }
    });


  }

  
}
