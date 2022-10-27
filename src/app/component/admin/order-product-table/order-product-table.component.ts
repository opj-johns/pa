import { Component, AfterViewInit,ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CartTableData } from 'src/app/model/cartTableData';
import { ProductWrapper } from 'src/app/model/data_models/product_wrapper';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-order-product-table',
  templateUrl: './order-product-table.component.html',
  styleUrls: ['./order-product-table.component.scss']
})
export class OrderProductTableComponent {

  displayedColumns: string[] = ['name', 'price'];
  dataSource!: MatTableDataSource<ProductWrapper>;
  productWrappers!: ProductWrapper[];
  clickedProducts: Set<Product> = new Set();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @Output('productQuantity') productQuantity: EventEmitter<number> = new EventEmitter(); 
  
  
  constructor(private productService: ProductService, private cartService: CartService) {
    this.getProducts(); 
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
        next: (data)=>{
          this.productWrappers = data;
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.productWrappers);
          // emit product quantity data for order component
          this.productQuantity.emit(this.productWrappers.length);
          console.log(`Fetched products:`, this.productWrappers);

          // test
          if(this.dataSource !== undefined && this.paginator !== undefined ){

            this.dataSource.paginator = this.paginator;
            
          }else{ console.log('undefined datasource') }
          if(this.dataSource.sort !== undefined && this.sort !== undefined){
      
            this.dataSource.sort = this.sort;
      
          }else{ console.log('undefined datasource') }
        },
        error: (error)=>{
          console.log('error fetching products', error);
        }
      }) 
  }

 addProduct(selectedProduct: Product){
  this.clickedProducts.add(selectedProduct);

  // this.productSelected.emit(selectedProduct);
  this.cartService.addSelectedProduct(selectedProduct);

 }



}

 

  