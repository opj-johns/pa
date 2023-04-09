import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentType } from 'src/app/model/payment-type';
import { PurchasePaymentService } from 'src/app/service/purchase-payment.service';

@Component({
  selector: 'app-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements OnInit {

  paymentTypes!: PaymentType[];
  selectedPaymentTypeId!: number ;
  amountPaid!: number;
  amountUnpaid!: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
     private purchasePaymentService: PurchasePaymentService,
    private dialogRef: MatDialogRef<PurchasePaymentComponent>) { }


  ngOnInit(): void {
  }

  loadPaymentTypes(){
    this.purchasePaymentService.fetchPaymentTypes().subscribe({
      next:(types)=>{
        this.paymentTypes = types;
      },
      error:(err)=>{
        console.log("Failed to fetch types", err);
      }
    })
  }

  onPayOrder(){
    console.log(this.data["purchaseId"] )
    if(this.amountPaid > this.amountUnpaid){
      alert("Montant doit-etre inférieur à crédit!");
      return;
    }
    this.purchasePaymentService.makePayment(this.amountPaid, 
                                    this.selectedPaymentTypeId, 
                                    this.data["purchaseId"] )
    .subscribe({
      next:(data)=>{
        alert("Paiement effectué");
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
