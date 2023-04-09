import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDialogData } from 'src/app/model/payment-dialog-data';
import { PurchasePaymentService } from 'src/app/service/purchase-payment.service';

@Component({
  selector: 'app-purchase-payment-history-dialog',
  templateUrl: './purchase-payment-history-dialog.component.html',
  styleUrls: ['./purchase-payment-history-dialog.component.scss']
})
export class PurchasePaymentHistoryDialogComponent implements OnInit {

  displayedColumns = ["typeOfPayment", "amountPaid", "date", "time"];
  paymentHistories!: PaymentDialogData[];
  showTable:boolean= true;
  
  dataSource!:PaymentDialogData[];

  constructor(@Inject(MAT_DIALOG_DATA) private data:number,
  private paymentService: PurchasePaymentService) { }

  ngOnInit(): void {
    this.fetchPaymentHistory();
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
