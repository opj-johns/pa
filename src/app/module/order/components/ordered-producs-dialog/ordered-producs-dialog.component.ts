import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProduct } from 'src/app/model/dialog-product';
import { OrderDetailService } from 'src/app/service/order-detail.service';

@Component({
  selector: 'app-ordered-producs-dialog',
  templateUrl: './ordered-producs-dialog.component.html',
  styleUrls: ['./ordered-producs-dialog.component.scss']
})
export class OrderedProducsDialogComponent implements OnInit {

  displayedColumns = ['productUrl','productName',  'quantity', 'price'];
  dataSource!: DialogProduct[];
  dialogProducts!: DialogProduct[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: number,
              private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    console.log("OrderedProductDialogComponent initialized!");
    console.log("I got order id:", this.data);
    this.getDialogProducts();
  }


  getDialogProducts(){
    this.orderDetailService.fetchDialogProducts(this.data).subscribe({
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

