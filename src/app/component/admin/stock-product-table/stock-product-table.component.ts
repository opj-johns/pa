import { Component,ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductWrapper } from 'src/app/model/data_models/product_wrapper';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-stock-product-table',
  templateUrl: './stock-product-table.component.html',
  styleUrls: ['./stock-product-table.component.scss']
})
export class StockProductTableComponent implements OnInit {

  displayedColumns: string[] = ['image','name','category' , 'price', 'qtyInStock', 'actions'];
  dataSource!: MatTableDataSource<ProductWrapper>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  productWrappers!: ProductWrapper[];

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit(): void {
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
      next: data =>{
        this.productWrappers = data;

        this.productWrappers.forEach(productWrapper=>{
          productWrapper.imageByte = 'data:image/jpeg;base64,' + productWrapper.imageByte;
        })

        

        // console.log(this.productWrappers[0].imageByte);
        // ------------------------------
         // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.productWrappers);
          console.log(this.productWrappers);
          // -----------------------------
          if(this.dataSource !== undefined && this.paginator !== undefined ){

            this.dataSource.paginator = this.paginator;
            
          }else{ console.log('undefined datasource') }
          if(this.dataSource.sort !== undefined && this.sort !== undefined){
            this.dataSource.sort = this.sort;
      
          }else{ console.log('undefined datasource') }

       
      },
      error: error=>{
        console.log( `Error fetching products`, error);
      }
    })
  }

  openEditPage(id:number){
    this.router.navigateByUrl(`/admin/product/form/${id}`);
  }
 


  
}


