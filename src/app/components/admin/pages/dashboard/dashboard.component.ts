import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  trainers:any=[]
  appointments:any;
  users:any;
  transactions:any=[];
  data:any;
  months:any;

  constructor(private serviceT : TrainerService,private userS : UsersService) {


  }



  ngOnInit() {
    this.userS.getTop5().subscribe((data:any)=>{
      console.log("chy",data);
      this.trainers = data['data'];

    })

    this.userS.getTransactions().subscribe((data:any)=>{
      console.log("chyx",data['data']);
      this.transactions = data['data'];

      this.data=data['data'];
      this.months=data['data'].map((element:any)=>  JSON.parse(element.month));

      console.log('ajas',this.data)

    })



    this.userS.getAllappointments().subscribe((data:any)=>{
      console.log("chy",data);
      this.appointments = data['data'];

    })

    this.userS.getAllusers().subscribe((data:any)=>{
      console.log("chy",data);
      this.users = data['data'];

    })
  }

}
