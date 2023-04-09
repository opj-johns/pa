import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentDialogData } from 'src/app/model/payment-dialog-data';
import { PaymentService } from 'src/app/service/payment.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-order-payment-history',
  templateUrl: './order-payment-history.component.html',
  styleUrls: ['./order-payment-history.component.scss']
})
export class OrderPaymentHistoryComponent implements OnInit {

  displayedColumns: string[] = ['typeOfPayment', 'amountPaid', 'date', 'time'];
  dataSource!: MatTableDataSource<PaymentDialogData>;
  totalAmountPaid: number=0;

  @Output("amountPaid") amountPaid = new EventEmitter<number>();

  @Input("order-id") orderId!: number;
  paymentHistories!: PaymentDialogData[];

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.fetchPaymentHistory();
    console.log('Order id received in ordered-products-table', this.orderId);
  }


  fetchPaymentHistory(){
    this.paymentService.fetchDialogPaymentData(this.orderId).subscribe({
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
