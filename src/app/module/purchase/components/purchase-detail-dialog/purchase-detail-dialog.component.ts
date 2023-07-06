import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Detail } from 'src/app/model/purchase-detail';


@Component({
  selector: 'app-purchase-detail-dialog',
  templateUrl: './purchase-detail-dialog.component.html',
  styleUrls: ['./purchase-detail-dialog.component.scss']
})
export class PurchaseDetailDialogComponent implements OnInit {

  @ViewChild('purchaseDetailForm') purchaseDetailForm!: NgForm;

  purchasePrice!: number;
  sellingPrice!: number;
  quantity!:number;
  oldStockQuantity!: number;
  isSupplierTableCall!: boolean;
  ttc: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) private data: Detail,
  private dialogRef: MatDialogRef<PurchaseDetailDialogComponent>) { }

  ngOnInit(): void {
    if(this.data !== undefined && this.data.isSupplierProductTableCall){
      // supplier product table component called this
      this.isSupplierTableCall = true;
      console.log("purchase detail dialog called from supplier table component");
      
    }else{
      // purchase cart table component called this
      console.log("purchase detail dialog called from purchase cart table component with data", this.data);
      this.isSupplierTableCall = false;
    }
    this.setDetails();
  }

  closeDialog(detail: Detail){
    this.dialogRef.close(detail);
  }

  closeDialogV1(){
    this.dialogRef.close();
  }

  onOkClicked(){
    // send response and close dialog
    if(this.purchaseDetailForm!==undefined){

      let detail: Detail = new Detail();
      detail.quantity = this.purchaseDetailForm.controls["quantity"].value;
      console.log("Detail",detail);
      this.closeDialog(detail);
    }
  }

  setDetails(){
    this.purchasePrice = this.data.purchasePrice;
    this.sellingPrice = this.data.sellingPrice;
    this.quantity = this.data.quantity;
    this.oldStockQuantity = this.data.oldStockQuantity;
  }
  

}
