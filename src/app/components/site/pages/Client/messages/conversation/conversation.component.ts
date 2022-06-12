import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MessagesService } from 'src/app/services/messages.service';
import { NotifyService } from 'src/app/services/notify.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  //Forms
  p: number = 1;

 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";

  url:string=environment.urlServeur;

  mywishlist : any;
  mymessages:any;
 
  constructor(private router:Router,private route: ActivatedRoute , private auth:AuthentificationService,private wishlistS : WishlistService ,private notifyService: NotifyService,private messagesSerivce: MessagesService) { }

  ngOnInit(): void {
  
    this.user = this.auth.getUser()!;

  

    this.messagesSerivce.getAllMymessagestest().subscribe((data:any) => {
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

  gotochat(sender:any,receiver:any,msgid:any) {


    if(sender==this.user.id) {

       this.messagesSerivce.markasread(msgid).subscribe((res: any) => {
       
        this.router.navigate(['/user/chats/',receiver]);

    
      });

    }else {

      this.messagesSerivce.markasread(msgid).subscribe((res: any) => {
       
        this.router.navigate(['/user/chats/',sender]);

    
      });

    }


  }





}
