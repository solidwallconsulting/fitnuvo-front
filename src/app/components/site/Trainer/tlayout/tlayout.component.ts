import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-tlayout',
  templateUrl: './tlayout.component.html',
  styleUrls: ['./tlayout.component.scss']
})
export class TlayoutComponent implements OnInit {
  echo : Echo;

  visible:number;
  user:User;
  constructor(private auth:AuthentificationService,private notificationS: NotificationsService ,private toastr: ToastrService) { 
    this.echo= this.notificationS.getSockets();

  }

  ngOnInit(): void {
    this.visible = this.auth.getVisible()!;
    this.user = this.auth.getUser()!;

    this.getDirectNotif();

  }

  getDirectNotif() {
    this.echo.private(`channel-notif.${this.user.id}`)
    .listen('RequestAppEvent' ,(resp:any) => {
      console.log('respss',resp);
      this.toastr.success(resp.response.message , 'Appointment ! ' , {
        timeOut:10000
      })
    })
  }

}
