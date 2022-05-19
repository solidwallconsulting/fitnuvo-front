import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { User } from 'src/app/models/user.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainerprofile',
  templateUrl: './trainerprofile.component.html',
  styleUrls: ['./trainerprofile.component.scss']
})
export class TrainerprofileComponent implements OnInit {

  id:number;
  trainer:Trainer
  constructor(private route: ActivatedRoute,private service: TrainerService,private router: Router) { }

  ngOnInit():void{

    this.id = this.route.snapshot.params['id'];


    this.service.getTrainer(this.id).subscribe((res:any) => {
      this.trainer = res['data'];
      console.log(res);
      console.log("trainr",this.trainer);

    }, (err:any) => {
      console.log(err)
    });

  }

}
