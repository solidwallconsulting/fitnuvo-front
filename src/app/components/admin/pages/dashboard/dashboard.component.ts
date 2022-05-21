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
  constructor(private serviceT : TrainerService,private userS : UsersService) {


  }



  ngOnInit() {
    this.userS.getTop5().subscribe((data:any)=>{
      console.log("chy",data);
      this.trainers = data['data'];

    })
  }

}
