import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsCComponent implements OnInit {


  p: number = 1;

  constructor(private notifS: NotificationsService,private confirmBox: NgxBootstrapConfirmService,private toastrService:ToastrService, private appS:AppointmentsService) { }

  url:string=environment.urlServeur;
  mynotifs:any;


  ngOnInit(): void {


    

    this.notifS.getmynotifications().subscribe((data:any) => {
      this.mynotifs = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })
  }




  booknow(id:any){





  }

}

