import { Component,ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-stock-product-table',
  templateUrl: './stock-product-table.component.html',
  styleUrls: ['./stock-product-table.component.scss']
})
export class StockProductTableComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'category' , 'price', 'qtyInStock', 'actions'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  products!: Product[];

  constructor(private productService: ProductService, private router: Router) {}

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
        this.products = data;

        

        

        // console.log(this.productWrappers[0].imageByte);
        // ------------------------------
         // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.products);
          console.log(this.products);
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
 

  onDelete(prod: Product){
      console.log(prod);

      if(confirm(`Voulez-vous supprimer ${prod.name}?`)){
        this.productService.deleteProduct(prod).subscribe({
          next:(data)=>{
            alert("Successfully deleted product");
  
            let prodIndex =this.products.findIndex(product => product.id === prod.id);
  
            if(prodIndex!==-1){
              this.products.splice(prodIndex, 1);
              this.dataSource = new MatTableDataSource(this.products);
            }
  
          },
          error:(err)=>{
            console.log("Error deleting product", err);
          }
        })
      }
  }


  
}


