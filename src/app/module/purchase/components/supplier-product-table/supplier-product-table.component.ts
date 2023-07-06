import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';
import { Detail, PurchaseDetail } from 'src/app/model/purchase-detail';
import { ProductService } from 'src/app/service/product.service';
import { PurchaseInteractionService } from 'src/app/service/purchase-interaction.service';
import { PurchaseDetailDialogComponent } from '../purchase-detail-dialog/purchase-detail-dialog.component';
import { Supplier } from 'src/app/model/supplier';





@Component({
  selector: 'app-supplier-product-table',
  templateUrl: './supplier-product-table.component.html',
  styleUrls: ['./supplier-product-table.component.scss']
})
export class SupplierProductTableComponent implements OnInit{

  displayedColumns: string[] = ['name', 'action'];
  dataSource!: MatTableDataSource<Product>;
  products!: Product[];
  disableAddButton: boolean[]=[];
  disabledProductsMap: Map<number, number> = new Map();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productService: ProductService, private matDialog: MatDialog, 
              private purchaseInterService: PurchaseInteractionService) {}

  ngOnInit(): void {
    this.getProducts();
    this.enableProductPurchase();
    this.listenToSelectedSupplier();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  getProducts(){
    this.productService.fetchProducts().subscribe({
      next: data =>{
        this.products = data;
        this.initializeIsActivatedProducts();

        console.log(data);
             
        this.displayProductsInTable([]);

       
      },
      error: error=>{
        console.log( `Error fetching products`, error);
      }
    })
  }

  displayProductsInTable(products: Product[]): void {
      this.dataSource = new MatTableDataSource(products);
          console.log(products);
          // -----------------------------
          if(this.dataSource !== undefined && this.paginator !== undefined ){

            this.dataSource.paginator = this.paginator;
            
          }else{ console.log('undefined datasource') }
          if(this.dataSource.sort !== undefined && this.sort !== undefined){
            this.dataSource.sort = this.sort;
      
          }else{ console.log('undefined datasource') }
  }

  takePurchaseDetails(product: Product, index: number){

    let productIndex = this.products.findIndex(p=> p.id === product.id);
    console.log("Product index: ", productIndex);

    let details = new Detail();
    details.sellingPrice = product.price;
    details.purchasePrice = product.purchasePrice;
    details.quantity = 0; 
    details.isSupplierProductTableCall = true;
    details.oldStockQuantity = product.qtyInStock;

   let dialogRef =   this.matDialog.open(PurchaseDetailDialogComponent, {
      data:{ ...details },
       width:"690px",
      });

    dialogRef.afterClosed().subscribe({
      next:(detail)=>{
        if(detail!==undefined){
          // functionality to disable and enable add buttons
          this.disableAddButton[index]=true;
          this.disabledProductsMap.set(product.id, index);
          console.log("received detail", detail);
          this.forwardPurchase(detail, product);
        }
      }
    })
  }

  forwardPurchase(detail: Detail, product: Product){
   // prepare purchase detail object
    let purchaseDetail = new PurchaseDetail();
    purchaseDetail.product = product;
    purchaseDetail.purchasePrice = product.purchasePrice;
    purchaseDetail.sellingPrice = product.price;
    purchaseDetail.quantity = detail.quantity;
    

    // update product details in purchase cart table through service  

    this.purchaseInterService.addNewPurchaseDetail(purchaseDetail);    

  }


  initializeIsActivatedProducts(){
    for(let i=0; i<this.products.length; i++){
        this.disableAddButton[i]=false;
    }
  }

  enableProductPurchase(){
    this.purchaseInterService.enableProductPurchaseSubject.subscribe({
      next:(productId)=>{
        let productIndex = this.disabledProductsMap.get(productId);
        if(productIndex!==undefined){
          this.disableAddButton[productIndex]=false;
          this.disabledProductsMap.delete(productId);
        }
      }
    })
  }

  listenToSelectedSupplier(){
    this.purchaseInterService.selectedSupplierSubject.subscribe({
      next:(supplier)=>{
        // this.supplier = supplier;
        console.log("Supplier selected: displayed in supplier product table component", supplier);
        const filteredProducts= this.getProductsBySupplier(supplier);
        this.displayProductsInTable(filteredProducts);
      }
    })
   }

   
  getProductsBySupplier(supplier: Supplier){
    return this.products
    .filter(_ => _.supplier.id === supplier.id);
  }    
  }



