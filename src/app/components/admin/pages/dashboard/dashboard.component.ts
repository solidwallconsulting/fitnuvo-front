import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { UsersService } from '../../services/users.service';
import { ChartData,  ChartOptions } from 'chart.js';

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

  total:any;
  salesData: ChartData<'line'>;
  chartOptions: ChartOptions;

  salesData2: ChartData<'line'>;
  chartOptions2: ChartOptions;

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





    this.userS.getMembresTrainersStats().subscribe((data:any)=>{
      console.log("chscyx",data['data']);

      this.months=data['data'].map((element:any)=>  element.month);
      this.total=data['data'].map((element:any)=>  element.total);

      console.log('ajas',this.data)

      this.salesData = {
        labels: this.months,
        datasets: [
          { label: 'Total Trainers', data: this.total, tension: 0.5 },
    
        ],
      };
      this.chartOptions= {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Trainers Data',
          },
        },
      };

    });


    this.userS.getMembresClientssStats().subscribe((data:any)=>{
      console.log("chscyx",data['data']);

      this.months=data['data'].map((element:any)=>  element.month);
      this.total=data['data'].map((element:any)=>  element.total);

      console.log('ajas',this.data)

      this.salesData2 = {
        labels: this.months,
        datasets: [
          { label: 'Total Clients', data: this.total, tension: 0.5 },
    
        ],
      };
      this.chartOptions2= {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Clients Data',
          },
        },
      };

    });



  }

}
