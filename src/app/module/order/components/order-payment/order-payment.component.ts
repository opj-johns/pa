import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentType } from 'src/app/model/payment-type';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {

  paymentTypes!: PaymentType[];
  selectedPaymentTypeId!: number ;
  amountPaid!: number;
  amountUnpaid!: number;

  constructor(private paymentService: PaymentService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<OrderPaymentComponent>) { }

  ngOnInit(): void {
    this.amountUnpaid = this.data["amountUnpaid"];
    this.loadPaymentTypes();
  }

  loadPaymentTypes(){
    this.paymentService.fetchPaymentTypes().subscribe({
      next:(types)=>{
        this.paymentTypes = types;
      },
      error:(err)=>{
        console.log("Failed to fetch types", err);
      }
    })
  }

  onPayOrder(){
    console.log(this.data["orderId"] )
    if(this.amountPaid > this.amountUnpaid){
      alert("Montant doit-etre inférieur à crédit!");
      return;
    }
    this.paymentService.makePayment(this.amountPaid, 
                                    this.selectedPaymentTypeId, 
                                    this.data["orderId"] )
    .subscribe({
      next:(data)=>{
        alert("Merci d'avoir effectué le paiement");
        console.log(data);
   
        // close the dialog
        this.closeDialog();



      },
      error:(err)=>{
        console.log("Error making payment", err);
      }
    })


   


  }

  closeDialog(){
    this.dialogRef.close({amountPaid:this.amountPaid, 
                          orderId: this.data.orderId});
  }

  close(){
    this.dialogRef.close();
  }
}
