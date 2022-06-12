import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MessagesService } from 'src/app/services/messages.service';
import { NotifyService } from 'src/app/services/notify.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../../auth/register/register.component';
import { MustMatch } from '../../../auth/_helpers/must-match.validator';

@Component({
  selector: 'app-messagesc',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  //Forms
  url:string=environment.urlServeur;


 IsmodelShow= false;
 submitted = false;
 user:User;
 id:any;
  photo="/assets/site/img/icon/Ellipse3.png";

  usermsg:any;

  privatemsgs : any;
 name:any;
  constructor(private router:Router,private route: ActivatedRoute, private auth:AuthentificationService,private wishlistS : WishlistService ,private notifyService: NotifyService,private msgservice:MessagesService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.msgservice.getPrivateMessages(this.route.snapshot.params['id']).subscribe((res:any) => {


      console.log('resil',Object.entries(res).values())
      this.privatemsgs = res['data'];
      console.log(res);
      console.log("trainr",this.privatemsgs);

    }, (err:any) => {
      console.log(err)
    });


    this.route.queryParams.subscribe(params => {
      this.name = params['ids'];
      console.log('dsfdssd',params['ids']);
    });


    this.auth.getUserOne(this.route.snapshot.params['id']).subscribe((res:any) => {


      this.usermsg = res['data'];
      

    });

    
  }


  onSubmit(msgForm: NgForm) {

    console.log('asssssl',this.route.snapshot.params['id'])

    
    return this.msgservice.sendMsg(this.route.snapshot.params['id'],msgForm.value.message).subscribe((res: any) => {
        
      console.log('assl',msgForm.value)
          
          this.ngOnInit();
          msgForm.reset();
       


          },(err:any)=>{ 

            console.log(err);
            Swal.fire({
              title: 'Error!',
              text:   err.error.message,
              icon: 'error'
              
            });
    });
        
     }





     back() {
      this.router.navigate(['/user/chats/']);
    }

}
