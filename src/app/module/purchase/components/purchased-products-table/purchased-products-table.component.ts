import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProduct } from 'src/app/model/dialog-product';
import { PurchaseDetailService } from 'src/app/service/purchase-detail.service';

@Component({
  selector: 'app-purchased-products-table',
  templateUrl: './purchased-products-table.component.html',
  styleUrls: ['./purchased-products-table.component.scss']
})
export class PurchasedProductsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice'];
  dataSource!: MatTableDataSource<DialogProduct>;
  ttc: number=0;
  @Output("TTC") TTC = new EventEmitter<number>();

  @Input("purchase-id") purchaseId!:number;

  dialogProducts!: DialogProduct[];

  constructor(private purchaseDetailService:PurchaseDetailService) { }

  ngOnInit(): void {
    console.log('Order id received in ordered-products-table', this.purchaseId);
    this.fetchOrderDetails();
  }

  fetchOrderDetails(){
    this.purchaseDetailService.fetchDialogProducts(this.purchaseId).subscribe({
      next:(data)=>{
        this.dialogProducts = data;
        this.dataSource = new MatTableDataSource(this.dialogProducts);
        
        console.log("details for ordered products table", this.dialogProducts);
        this.calculateTTC();
      }, 
      error:(err)=>{
        console.log("unable to fetch details", err);
      }
    })
  }

  calculateTTC(){
    this.dialogProducts.forEach(product=>{
      this.ttc += (product.price * product.quantity);
    });
    this.emitTTC();
  }

  emitTTC(){
    this.TTC.emit(this.ttc);
  }

}
