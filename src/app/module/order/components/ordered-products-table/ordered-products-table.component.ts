import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProduct } from 'src/app/model/dialog-product';
import { OrderDetail } from 'src/app/model/order-detail';
import { OrderDetailService } from 'src/app/service/order-detail.service';

@Component({
  selector: 'app-ordered-products-table',
  templateUrl: './ordered-products-table.component.html',
  styleUrls: ['./ordered-products-table.component.scss']
})
export class OrderedProductsTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice'];
  dataSource!: MatTableDataSource<DialogProduct>;
   ttc: number=0;
   @Output("TTC") TTC = new EventEmitter<number>();

  @Input("order-id") orderId!:number;
  
  dialogProducts!: DialogProduct[];

  constructor(private orderDetailService: OrderDetailService) {}
  
  ngOnInit(): void {
    console.log('Order id received in ordered-products-table', this.orderId);
    this.fetchOrderDetails();
  }

  fetchOrderDetails(){
    this.orderDetailService.fetchDialogProducts(this.orderId).subscribe({
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
