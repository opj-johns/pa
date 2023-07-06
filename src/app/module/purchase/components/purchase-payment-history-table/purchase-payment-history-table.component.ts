import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentDialogData } from 'src/app/model/payment-dialog-data';
import { PurchasePaymentService } from 'src/app/service/purchase-payment.service';

@Component({
  selector: 'app-purchase-payment-history-table',
  templateUrl: './purchase-payment-history-table.component.html',
  styleUrls: ['./purchase-payment-history-table.component.scss']
})
export class PurchasePaymentHistoryTableComponent implements OnInit {

  displayedColumns: string[] = ['typeOfPayment', 'amountPaid', 'date', 'time'];
  dataSource!: MatTableDataSource<PaymentDialogData>;
  totalAmountPaid: number=0;

  @Input("purchase-id") purchaseId!: number;
  paymentHistories!: PaymentDialogData[];

  @Output("amountPaid") amountPaid = new EventEmitter<number>();

  constructor(private purchasePaymentService: PurchasePaymentService) { }

  ngOnInit(): void {
    this.fetchPaymentHistory();
    console.log('Order id received in ordered-products-table', this.purchaseId);
  }

  fetchPaymentHistory(){
    this.purchasePaymentService.fetchDialogPaymentData(this.purchaseId).subscribe({
      next:(data)=>{
        console.log("Fetched payment histories", data);
        this.paymentHistories = data;
        this.dataSource = new MatTableDataSource(data);
        this.calculateTotalAmountPaid();
      },
      error:(err)=>{
        console.log("Error fetching payment history", err);
      }
    })
  }
  
  calculateTotalAmountPaid(){
    this.paymentHistories.forEach(history=>{
      this.totalAmountPaid += history.amountPaid;
    })
    this.emitAmountPaid();
  }

  emitAmountPaid(){
    this.amountPaid.emit(this.totalAmountPaid);
  }
  
}
