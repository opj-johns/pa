import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular'
import { ExpenseSalesChartComponent } from './components/expense-sales-chart/expense-sales-chart.component';


@NgModule({
  declarations: [
    ExpenseSalesChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports:[
    ExpenseSalesChartComponent
  ]
})
export class ChartsModule {} 
