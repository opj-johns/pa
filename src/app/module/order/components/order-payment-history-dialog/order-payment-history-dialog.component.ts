import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDialogData } from 'src/app/model/payment-dialog-data';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-order-payment-history-dialog',
  templateUrl: './order-payment-history-dialog.component.html',
  styleUrls: ['./order-payment-history-dialog.component.scss']
})
export class OrderPaymentHistoryDialogComponent implements OnInit, AfterViewInit {

  displayedColumns = ["typeOfPayment", "amountPaid", "date", "time"];
  paymentHistories!: PaymentDialogData[];
  showTable:boolean= true;
  
  dataSource!:PaymentDialogData[];

  constructor(@Inject(MAT_DIALOG_DATA) private data:number,
              private paymentService: PaymentService) { }


  ngOnInit(): void {
    this.fetchPaymentHistory();
  }

  ngAfterViewInit(){
     
  }

  fetchPaymentHistory(){
    this.paymentService.fetchDialogPaymentData(this.data).subscribe({
      next:(data)=>{
        this.dataSource = data;
        this.paymentHistories = data;
        this.showTable = this.paymentHistories.length > 0;
        console.log("Number of payment histories",this.paymentHistories.length)
        console.log("data: ", data);
        console.log("payment history: ", this.paymentHistories);
      },
      error:(err)=>{
        console.log("Error fetching payment history", err);
      }
    })
  }


  

}
