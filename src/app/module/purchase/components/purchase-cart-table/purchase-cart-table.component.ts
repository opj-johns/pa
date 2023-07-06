import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';
import { Detail, PurchaseDetail } from 'src/app/model/purchase-detail';
import { PurchaseInteractionService } from 'src/app/service/purchase-interaction.service';
import { PurchaseDetailDialogComponent } from '../purchase-detail-dialog/purchase-detail-dialog.component';





@Component({
  selector: 'app-purchase-cart-table',
  templateUrl: './purchase-cart-table.component.html',
  styleUrls: ['./purchase-cart-table.component.scss']
})
export class PurchaseCartTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'name', 'action'];
  dataSource!: MatTableDataSource<Product>;

  private products: Product[] = [];
  private isFirstDetails = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private purchaseInterService:PurchaseInteractionService, 
    private matDialog: MatDialog) { 
     
  }

  ngOnInit(): void {
    this.newProductAdded();
    this.emptyProductsTable();
    this.listenToSelectedSupplier();
  }
  ngAfterViewInit():void{
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listenToSelectedSupplier(){
    console.log("listenToSelectedSupplier");
    this.purchaseInterService.selectedSupplierSubject.subscribe({
      next:(supplier)=>{
        // this.supplier = supplier;
        console.log(`I have ears`);
        this.purchaseInterService.resetPurchaseCartProductTable();
      }
    })
  }

  onDelete(product: Product){
     
      let index = this.products.findIndex(p=> p.id === product.id);
      if(index>-1){
        this.products.splice(index,1);
        this.dataSource = new MatTableDataSource(this.products);
        this.purchaseInterService.enableProductPurchase(product.id);
      }
     
      this.purchaseInterService.deletePurchaseDetail(product.id);
  }

  onEdit(product: Product){
    console.log(`test product`,product);
    let detail = this.purchaseInterService.getDetail(product.id);
    let dialogRef = this.matDialog.open(PurchaseDetailDialogComponent, {
      data:{ ...detail, isSupplierProductTableCall:false, oldStockQuantity: product.qtyInStock },
      width: '690px'
    })
    
    dialogRef.afterClosed().subscribe({
      next:(detail:Detail)=>{
      if(detail!==undefined){
        console.log(`Dialog closed from purchase cart!!`);
        this.purchaseInterService
          .editPurchaseDetail(product, detail);
      }
      }
    })
  }


  newProductAdded(){
       this.purchaseInterService.newProductSubject.subscribe({
        next:(product)=>{
          this.products.push(product);
          this.dataSource = new MatTableDataSource(this.products);
          
          if(this.isFirstDetails){
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isFirstDetails = false;
          }

        }
       })
  }

  emptyProductsTable(){
    this.purchaseInterService.emptyProductTableSubject.subscribe({
      next:(emptyArray)=>{
        this.products.forEach(product=>{
           this.purchaseInterService.enableProductPurchase(product.id);
        })

        this.products = emptyArray;
        this.dataSource = new MatTableDataSource(this.products);
      }
    })
  }
}


