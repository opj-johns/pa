import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProduct } from 'src/app/model/dialog-product';
import { PurchaseDetailService } from 'src/app/service/purchase-detail.service';

@Component({
  selector: 'app-purchase-products-dialog',
  templateUrl: './purchase-products-dialog.component.html',
  styleUrls: ['./purchase-products-dialog.component.scss']
})
export class PurchaseProductsDialogComponent implements OnInit {

  displayedColumns = ['productUrl','productName',  'quantity', 'price'];
  dataSource!: DialogProduct[];
  dialogProducts!: DialogProduct[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: number,
              private purchaseDetailService: PurchaseDetailService) { }

  ngOnInit(): void {
    this.getDialogProducts();
  }

  getDialogProducts(){
    this.purchaseDetailService.fetchDialogProducts(this.data).subscribe({
      next:(data)=>{
           this.dialogProducts = data;
           this.dataSource = this.dialogProducts;
           console.log("dialog products fetched successfully", data); 
      },
      error:(err)=>{
         console.log("Error fetching dialog products", err);
      }
    })

  }
}
