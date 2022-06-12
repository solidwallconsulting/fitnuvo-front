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
  numtrainers:any;
  numcustomers:any;
  numspecs:any;

  constructor(private serviceT : TrainerService,private userS : UsersService) {


  }



  ngOnInit() {
    this.userS.getTop5().subscribe((data:any)=>{
      console.log("chy",data);
      this.trainers = data['data'];

    })

    this.userS.getTransactions().subscribe((data:any)=>{
      console.log("chscyx",data['data']);
      this.transactions = data['data'];

      this.data=data['data'];
      this.months=data['data'].map((element:any)=>  element.month);

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

    this.userS.numcustomers().subscribe((data:any)=>{
      console.log("ssqqdq",data);
      this.numcustomers = data['data'];

    })
    this.userS.numtrainers().subscribe((data:any)=>{
      console.log("chsssy",data);
      this.numtrainers = data['data'];

    })
    this.userS.numspecs().subscribe((data:any)=>{
      console.log("chsssy",data);
      this.numspecs = data['data'];

    })
  }

}
