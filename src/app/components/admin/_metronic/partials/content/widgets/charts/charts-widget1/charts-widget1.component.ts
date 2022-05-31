import { Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';

@Component({
  selector: 'app-charts-widget1',
  templateUrl: './charts-widget1.component.html',
})
export class ChartsWidget1Component implements OnInit {
  @Input() data: any;

  datae:any[];
  chartOptions: any = {};


  constructor() {}

  ngOnInit(): void {

    console.log('dsq',this.data)
    this.chartOptions = getChartOptions(350,this.data);


  }
}

function getChartOptions(height: number ,data:any) {

  console.log("dsddd",data)

  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');

  let months=data.map((element:any)=>  element.month);

  console.log("ussnitt",months)
  let amounts=data.map((element:any)=>  JSON.parse(element.amount));
  

  

  return {
    series: [
      
      {
        name: 'Transactions total',
        data: amounts,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return '£' + val ;
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}
