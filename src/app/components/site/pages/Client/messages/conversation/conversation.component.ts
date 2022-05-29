import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MessagesService } from 'src/app/services/messages.service';
import { NotifyService } from 'src/app/services/notify.service';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  //Forms

 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";


  mywishlist : any;
  mymessages:any;
 
  constructor(private router:Router, private auth:AuthentificationService,private wishlistS : WishlistService ,private notifyService: NotifyService,private messagesSerivce: MessagesService) { }

  ngOnInit(): void {
  
    this.user = this.auth.getUser()!;

  

    this.messagesSerivce.getAllMymessages().subscribe((data:any) => {
      console.log("dtg",data['data'])
      this.mymessages = data['data'];
    },(err: any) => {
      console.log("errapp",err)
    })


    
  }


  removefromList(id:any){

    
    return this.wishlistS.removefromList(id).subscribe((res: any) => {
      console.log(res);
        //sweetalert message popup
        this.notifyService.showSuccess("Trainer removed from your wishlist successfully!", "Wishlist");
  
        //this.registerFormC.reset();
  
      
  },(err)=>{ 
    console.log(err);
  
  });
  
  }



}