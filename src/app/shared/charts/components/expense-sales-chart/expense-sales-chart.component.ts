import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-expense-sales-chart',
  templateUrl: './expense-sales-chart.component.html',
  styleUrls: ['./expense-sales-chart.component.scss']
})
export class ExpenseSalesChartComponent implements OnInit {

   chartOptions: {} = {};

  Highcharts = Highcharts; 
  
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
  chart: {
    type: 'spline',
    backgroundColor: '#E8ECD6',
    borderRadius: 5,
    borderWidth: 2,
    borderColor:'#FDFFF0',
    height:300
  },
 
  title: {
    text: 'GHARGE vs VENTS',
    style:{
        color: '#D74152',
         fontSize: 20,
    }
  },
  xAxis: {
    
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels:{
      style:{
         color: '#D74152',
         fontSize: 13,
      }
    }
  },
  yAxis: {
    title: {
      text: 'Montant en USD',
          style:{
            color:"#D74152",
            fontSize: "15px",
            fontStyle: "Verdana"
         },

    },
     labels:{
      style:{
         color: '#D74152',
         fontSize: 13,
      }
    }
  },
  tooltip: {
    crosshairs: true,
    shared: true
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: '#FDFFF0',
        lineWidth: 1
      },
      // color:'blue',
     
    }
  },
  
   series: [
      {
        type:'spline',
        name: 'Charge',
        marker: {
          symbol: 'square',
        },
        data: [{y: 1200,},1300, 1000,800,700, 400, 1500, 1200
            , 900, 600, 1100, 1478]
      }, 
     {
        type:'spline',
        name: 'Vents',
        color: '#D74152',
        
        marker: {
          symbol: 'diamond'
        },
        data: [
          {
          y: 3000,
        }, 2500, 2000, 2100, 1789, 1799, 2100, 2109, 2012, 1267, 1222, 1500]
     }]


 }
 

  }

}
