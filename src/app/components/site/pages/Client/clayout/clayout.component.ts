import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-clayout',
  templateUrl: './clayout.component.html',
  styleUrls: ['./clayout.component.scss']
})
export class ClayoutComponent implements OnInit {
  echo : Echo;
  user : User;

  constructor(private auth: AuthentificationService , private notificationS: NotificationsService ,private toastr: ToastrService) {

    this.echo= this.notificationS.getSockets();

   }

  ngOnInit(): void {

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
