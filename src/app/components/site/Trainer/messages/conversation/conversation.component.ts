import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConverComponent implements OnInit {
  mymessages:any;
  user:User;

  visible:number;
  constructor(private auth:AuthentificationService,private messagesSerivce:MessagesService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser()!;


    
    this.messagesSerivce.getAllMymessages().subscribe((data:any) => {
      console.log("dtg",data['data'])
      this.mymessages = data['data'];
    },(err: any) => {
      console.log("errapp",err)
    })

  }

}
