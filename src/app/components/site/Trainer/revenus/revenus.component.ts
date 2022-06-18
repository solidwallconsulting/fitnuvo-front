import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';
import { ChartData,  ChartOptions } from 'chart.js';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-revenus',
  templateUrl: './revenus.component.html',
  styleUrls: ['./revenus.component.scss']
})
export class RevenusComponent implements OnInit {
  transactions:any;
  data:any;
  months:any;

  amounts:any;
  salesData: ChartData<'line'>;
  chartOptions: ChartOptions;

  constructor(private trainerS:TrainerService) {}
 
  ngOnInit(): void {
    this.trainerS.getTransactions().subscribe((data:any)=>{
      console.log("chscyx",data['data']);
      this.transactions = data['data'].map((element:any)=>  element.transactions);

      this.data=data['data'];
      this.months=data['data'].map((element:any)=>  element.month);
      this.amounts=data['data'].map((element:any)=>  element.amount);

      console.log('ajas',this.data)

      this.salesData = {
        labels: this.months,
        datasets: [
          { label: 'Revenue', data: this.amounts, tension: 0.5 },
          { label: 'Total transactions', data: this.transactions, tension: 0.5 },
    
        ],
      };
      this.chartOptions= {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Revenus Data',
          },
        },
      };

    });

    

  }

  

        
}



