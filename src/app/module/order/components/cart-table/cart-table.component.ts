import { Component, ViewChild, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CartTableData } from 'src/app/model/cartTableData';
import { Client } from 'src/app/model/client';
import { Employee } from 'src/app/model/employee';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ClientService } from 'src/app/service/client.service';
import { EmployeeService } from 'src/app/service/empolyee.service';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { OrderService } from 'src/app/service/order.service';





@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit, AfterViewInit{


 

  displayedColumns: string[] = ['name', 'qty', 'totalPrice'];
  dataSource!: MatTableDataSource<CartTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild("cartForm") cartForm!: NgForm;
  
  @Input("order_id") orderId!: number | undefined ;
  showRealSelect: boolean = true;

  // @Input("cartProducts") selectedCartProducts: CartTableData[]=[];
  
  selectedProductIds: number[]=[];
  cartProducts: CartTableData[]=[];

  numberOfProdsInCart: number = 0;
  totalCartPrice:number = 0;

  employees!: Employee[];
  selectedEmployeeId: number=0;
  clients!: Client[];
  selectedClientId: number=0;

  selectedEmployeeName: string ="Kojo Employee"; 
  selectedClientName: string ="Fiifi Client"; 

  constructor(private cartService: CartService, 
              private employeeService: EmployeeService,
              private orderService: OrderService,
              private orderDetailService:OrderDetailService,
              private router: Router,
              private clientService: ClientService) { 
     this.listenForProducts();
     this.dataSource = new MatTableDataSource(this.cartProducts);
  }

 
 

  ngOnInit(): void {
    
    if(this.orderId !== undefined){
      this.showRealSelect = false;
      console.log("I should not receive input from order component");
    }
    console.log("Value of orderId in cart-table component", this.orderId);
    this.getEmployees();
    this.getClients();
    // console.log(this.selectedProductIds.length>0 && this.selectedEmployeeId !==0);
  }

  ngAfterViewInit(){
    this.getOrder();
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

  getClients(){
     this.clientService.fetchClients().subscribe({
      next:(data)=>{
        this.clients = data;
        console.log("successfully fetched clients", data);
      },
      error:(err)=>{
        console.log("error fectching clients", err);
      }
     })   
  }

  productInCart(productClicked: Product): boolean{
      
    let  productIdExists = false;

      this.selectedProductIds.forEach(id => { if( id === productClicked.id ) productIdExists = true });

      return productIdExists;
  }

  onValidate(){
    this.orderDetailService.save(this.selectedEmployeeId, 
                                 this.selectedClientId,
                                 this.cartProducts).subscribe({
                                  next:(resp)=>{
                                    alert("Command Sauvegardé avec succès");
                                    // reset cartForm
                                    this.cartForm.reset;
                                    console.log(this.cartForm.value);
                                    // empty cart
                                    this.cartProducts=[];
                                    this.dataSource.data = this.cartProducts;
                                    console.table(resp);
                                  },
                                  error:(err)=>{
                                    alert("Error !!!!! Failed to save order");
                                    console.log(err);
                                  }
                                 })
  }

  getOrder(){
    if(this.orderId!==undefined)
    this.orderService.getOrder(this.orderId).subscribe({
      next:(data)=>{
         this.selectedClientName = data.client.firstName + " " +data.client.lastName;
         this.selectedEmployeeName = data.employee.firstName +" "+ data.employee.lastName;
         this.selectedClientId = data.client.id;
         this.selectedEmployeeId - data.employee.id;
      }
    })
  }

  onUpdate(){
    if(this.orderId!==undefined){
      this.orderDetailService.updateDetails(this.orderId, this.cartProducts).subscribe({
        next:(data)=>{
          alert("Command est mis à jour avec succès");

          console.log("updated order details", data);
          this.router.navigateByUrl("admin/order-detail");

        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}


