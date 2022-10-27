import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CartTableData } from 'src/app/model/cartTableData';
import { Employee } from 'src/app/model/employee';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { EmployeeService } from 'src/app/service/empolyee.service';



@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit{

  displayedColumns: string[] = ['name', 'qty', 'totalPrice'];
  dataSource!: MatTableDataSource<CartTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  // @Input("cartProducts") selectedCartProducts: CartTableData[]=[];
  
  selectedProductIds: number[]=[];
  cartProducts: CartTableData[]=[];
  numberOfProdsInCart: number = 0;
  employees!: Employee[];
  selectedEmployeeId: number=0;
  totalCartPrice:number = 0;

  constructor(private cartService: CartService, private employeeService: EmployeeService) { 
     this.listenForProducts();
    this.dataSource = new MatTableDataSource(this.cartProducts);

  }

  listenForProducts(){
    this.cartService.selectedProduct.subscribe({
      next: (data)=>{ 
        
        this.addProduct(data);

        // console.log('broadcasted product received from cart service successfully',data);
      
      },
      error:(error)=>{console.log('error receiving multicasted product from cart service', error)}
    })
  }
 

  ngOnInit(): void {
    this.getEmployees();
    console.log(this.selectedProductIds.length>0 && this.selectedEmployeeId !==0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProduct(productClicked: Product ){
    // if the id of product clicked is not in selectedProductIds, add it's id to it, else
    // increase the quantity and the totalPrice
    if(this.productInCart(productClicked)){
      this.cartProducts.forEach( (cartProduct, index)=>{
        // find already added product
        if (cartProduct.id === productClicked.id){

          // increase the products quantity and totalPrice values
          this.cartProducts[index].qty += 1;
          this.totalCartPrice += productClicked.price;
          this.cartProducts[index].totalPrice += productClicked.price;  
           
        }
      })
    }else{

        let newCartProduct = new CartTableData();
        newCartProduct.id = productClicked.id;
        newCartProduct.name = productClicked.name;
        newCartProduct.qty = 1;
        newCartProduct.totalPrice = productClicked.price;
        newCartProduct.unitPrice =  productClicked.price;
        this.cartProducts.push(newCartProduct);
        
        // this.dataSource = new MatTableDataSource(this.cartProducts);
        this.dataSource.data = this.cartProducts;

         // increase total cart price
         this.totalCartPrice += productClicked.price;
         
        // add selected product's id to the ids array
        this.selectedProductIds.push(productClicked.id);

        console.log('Selected product ids',this.selectedProductIds);
    }

    // increase number of products in cart
    this.numberOfProdsInCart += 1;
    // multicast changes to listeners
    this.cartService.changeCartSize(this.numberOfProdsInCart);
    this.cartService.changeTotalPrice(this.totalCartPrice);
    
    console.log('cart products',this.cartProducts);
  }

 

  removeProduct(cartProduct: CartTableData){

    console.log(this.dataSource.data);

     this.cartProducts.forEach((product, index)=>{
        if(product.id === cartProduct.id){
          // if qty is one, remove product
          if(this.cartProducts[index].qty <= 1) {
            this.cartProducts.splice(index,1);
            this.selectedProductIds.splice(index,1);
            this.dataSource.data = this.cartProducts;
            // reduce total cart price
            this.totalCartPrice -= product.unitPrice;
            
            // console.log("test")
            // console.log(this.cartProducts);
            return;
          }
           this.cartProducts[index].qty -= 1;
           this.cartProducts[index].totalPrice -= cartProduct.unitPrice;
           this.totalCartPrice -= cartProduct.unitPrice;
        }
     })

      // decrease number of products in cart
    this.numberOfProdsInCart -= 1;
    this.cartService.changeCartSize(this.numberOfProdsInCart);
    this.cartService.changeTotalPrice(this.totalCartPrice);
  //   this.dataSource.data.forEach((product, index)=>{
  //     if(product.id === cartProduct.id){
  //       // if qty is one, remove product
  //       if(this.dataSource.data[index].qty <= 1) {
  //         this.dataSource.data.splice(index,1);
  //         this.da
  //         // console.log(this.cartProducts);
  //         return;
  //       }
  //        this.dataSource.data[index].qty -= 1;
  //        this.dataSource.data[index].totalPrice -= cartProduct.unitPrice;
  //     }
  //  })
  } 

  getEmployees(){
    this.employeeService.fetchEmployees().subscribe(({
      next:(data)=>{
        this.employees = data;
        console.log('fetched employees', this.employees);
      },
      error:(err)=>{console.log(err)}
    }))
  }

  productInCart(productClicked: Product): boolean{
      
    let  productIdExists = false;

      this.selectedProductIds.forEach(id => { if( id === productClicked.id ) productIdExists = true });

      return productIdExists;
  }

 
}


