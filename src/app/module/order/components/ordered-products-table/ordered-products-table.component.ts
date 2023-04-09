import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProduct } from 'src/app/model/dialog-product';
import { OrderDetail } from 'src/app/model/order-detail';
import { OrderDetailService } from 'src/app/service/order-detail.service';

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
