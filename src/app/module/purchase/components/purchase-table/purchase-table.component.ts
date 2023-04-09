import { Component, OnInit } from '@angular/core';
import { PurchaseTableData } from 'src/app/model/purchase-table-data';
import { PurchaseService } from 'src/app/service/purchase.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseProductsDialogComponent } from '../purchase-products-dialog/purchase-products-dialog.component';
import { PurchasePaymentComponent } from '../../component/purchase-payment/purchase-payment.component';
import { Router } from '@angular/router';

import { PurchasePaymentHistoryDialogComponent } from '../../component/purchase-payment-history-dialog/purchase-payment-history-dialog.component';

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit {

  purchases!: PurchaseTableData[];
  displayedColumns: string[] = ['supplierName', 
                                'date', 'status',
                                'numberOfProducts',
                                'ttc','amountPaid',
                                'amountUnpaid','actions'];
  dataSource!: MatTableDataSource<PurchaseTableData>;
  deletedPurchaseId!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private purchaseService:PurchaseService,
              private dialog: MatDialog,
              private router:Router) { }

  ngOnInit(): void {
    this.getPurchaseTableData();
  }

  


  getPurchaseTableData(){
    this.purchaseService.fetchPurchaseData().subscribe({
      next:(data)=>{
         this.purchases = data;
         console.log("purchases:", data);


         for(let i=0; i<this.purchases.length; i++){
          this.purchases[i].date = this.purchases[i].date.split("T")[0];
          } 

         this.dataSource = new MatTableDataSource(this.purchases);

         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },
      error:(err)=>{
         console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProductDialog(purchaseId:number){
    const dialogRef = this.dialog.open(PurchaseProductsDialogComponent,{
      data:purchaseId,
      width:"750px"
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
      console.log(purchaseId);
  }

  openPaymentHistoyDialog(purchaseId:number){
     this.dialog.open(PurchasePaymentHistoryDialogComponent,{
      data:purchaseId,
      width:"600px",
    });
  }

  onDelete(purchaseId:number){
    this.deletedPurchaseId = purchaseId;
    if(confirm("Voulez-vous vraiement supprimer cet achat?")){
     this.purchaseService.delete(purchaseId).subscribe({
       next:(data)=>{
           alert("Purchase est Supprimer!");


           this.updatePurchaseTableByPurchase();
       },
       error:(err)=>{
          alert("Error deleting purchase");
          console.log(err);
       }
     })
    }
 }

 
 updatePurchaseTableByPurchase(){
  let index = this.purchases.findIndex(purchase=>{
    return purchase.purchaseId === this.deletedPurchaseId;
  })
  console.log("Index retrieved", index);
  if(index>-1){
    console.log("Sliced purchase: ",this.purchases.splice(index,1)); 

    this.dataSource = new MatTableDataSource(this.purchases);
  }

}

  onPayPurchase(purchaseId: number, amountUnpaid: number){
    const dialogRef = this.dialog.open(PurchasePaymentComponent,{
      data:{purchaseId: purchaseId, amountUnpaid:amountUnpaid},
      width:"600px",
    });
    
    dialogRef.afterClosed().subscribe({
      next:(data)=>{
        console.log(data);
        if(data!==undefined){
          this.updatePurchaseTable(data.amountPaid, data.purchaseId);
        }
      }
    })
  }

  updatePurchaseTable(amountPaid:number, purchaseId:number){
    
    
    let pIndex = this.purchases.findIndex(purchase=>{
      return purchase.purchaseId === purchaseId;
    })
    
    if(pIndex>-1){
      this.purchases[pIndex].amountPaid += amountPaid;
      this.purchases[pIndex].amountUnpaid -= amountPaid;
    }

  }
  
  onEditPurchase(purchaseId:number){
    this.router.navigateByUrl(`/admin/purchase/${purchaseId}`);
  }

  onShowReceipt(purchaseId:number){
    this.router.navigateByUrl(`/admin/purchase/payment-receipt/${purchaseId}`);
  }


}
