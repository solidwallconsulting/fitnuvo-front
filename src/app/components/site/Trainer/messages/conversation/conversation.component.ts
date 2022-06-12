import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MessagesService } from 'src/app/services/messages.service';
import Echo  from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConverComponent implements OnInit {
  
  //Forms
  p: number = 1;

 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";

  url:string=environment.urlServeur;

  mymessages:any;
 
  constructor(private router:Router,private route: ActivatedRoute , private auth:AuthentificationService,private notifyService: NotifyService,private messagesSerivce: MessagesService) { }

  ngOnInit(): void {
  
    this.user = this.auth.getUser()!;

  

    this.messagesSerivce.getAllMymessagestest().subscribe((data:any) => {
      console.log("dtg",data['data'])
      this.mymessages = data['data'];
    },(err: any) => {
      console.log("errapp",err)
    })


    
  }



  gotochat(sender:any,receiver:any,msgid:any) {


    if(sender==this.user.id) {

       this.messagesSerivce.markasread(msgid).subscribe((res: any) => {
       
        this.router.navigate(['/trainerme/chats/',receiver]);

    
      });

    }else {

      this.messagesSerivce.markasread(msgid).subscribe((res: any) => {
       
        this.router.navigate(['/trainerme/chats/',sender]);

    
      });

    }


  }





}



