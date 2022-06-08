import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotifyService } from 'src/app/services/notify.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../../auth/register/register.component';
import { MustMatch } from '../../../auth/_helpers/must-match.validator';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  //Forms
  p: number = 1;

 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";
  url:string=environment.urlServeur;


  mywishlist : any;
 
  constructor(private router:Router, private auth:AuthentificationService,private wishlistS : WishlistService ,private notifyService: NotifyService) { }

  ngOnInit(): void {
  

     this.wishlistS.getmyWishlist().subscribe((data:any) => {
      this.mywishlist = data['data'];
    },(err: any) => {
      console.log("errapp",err)
    })


    
  }


  removefromList(id:any){

    
    return this.wishlistS.removefromList(id).subscribe((res: any) => {
      console.log(res);
         this.ngOnInit();

        //sweetalert message popup
        this.notifyService.showWarning("Trainer removed from your wishlist successfully!", "Wishlist");
  

        this.ngOnInit();
        //this.registerFormC.reset();
  
      
  },(err)=>{ 
    console.log(err);
  
  });
  
  }

  goto(id:any){
    this.router.navigate(['trainer/'+id]);

  }



}
