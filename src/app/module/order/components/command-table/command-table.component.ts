import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Command } from 'src/app/model/command';
import { OrderService } from 'src/app/service/order.service';
import { OrderedProducsDialogComponent } from '../ordered-producs-dialog/ordered-producs-dialog.component';
import { OrderPaymentHistoryDialogComponent } from '../order-payment-history-dialog/order-payment-history-dialog.component';
import { OrderPaymentComponent } from '../order-payment/order-payment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-command-table',
  templateUrl: './command-table.component.html',
  styleUrls: ['./command-table.component.scss']
})
export class CommandTableComponent implements OnInit{
  displayedColumns: string[] = ['clientName',
                               'employeeName', 
                               'date',
                               'status', 'numberOfProducts',
                               'ttc','amountPaid',
                               'amountUnpaid', 'actions'];
  dataSource!: MatTableDataSource<Command>;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  commands!: Command[];
  deletedOrderId!:number;

  constructor(private orderService:OrderService,
              
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    this.getCommands();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getCommands(){
      this.orderService.fetchCommands().subscribe({
        next:(data)=>{
          this.commands = data;

          for(let i=0; i<this.commands.length; i++){
          this.commands[i].date = this.commands[i].date.split("T")[0];
          } 

           // Assign the data to the data source for the table to render
           this.dataSource = new MatTableDataSource(this.commands);
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  openProductDialog(orderId:number){
    const dialogRef = this.dialog.open(OrderedProducsDialogComponent,{
      data:orderId,
      width:"750px"
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
      console.log(orderId);
  }

  openPaymentDialog(orderId:number){
    const dialogRef = this.dialog.open(OrderPaymentHistoryDialogComponent,{
      data:orderId,
      width:"600px",
    });
  }
  
  onDelete(orderId:number){
     this.deletedOrderId = orderId;
     if(confirm("Voulez-vous vraiement supprimer cet commande?")){
      this.orderService.deleteOrder(orderId).subscribe({
        next:(data)=>{
            alert("Command est Supprimer!");


            this.updateCommandTableByOrder();
        },
        error:(err)=>{
           alert("Error deleting commande");
           console.log(err);
        }
      })
     }
  }

  onShowReceipt(orderId:number){
    this.router.navigateByUrl(`/admin/order/payment-receipt/${orderId}`);
  }
  
  onPayOrder(orderId: number, amountUnpaid: number){
    const dialogRef = this.dialog.open(OrderPaymentComponent,{
      data:{orderId: orderId, amountUnpaid:amountUnpaid},
      width:"600px",
    });
    
    dialogRef.afterClosed().subscribe({
      next:(data)=>{
        console.log(data);
        if(data!=undefined){
          this.updateCommandTable(data.amountPaid, data.orderId);
        }
      }
    })
  }
  
  updateCommandTable(amountPaid:number, orderId:number){
    
    
    let commandIndex = this.commands.findIndex(command=>{
      return command.orderId === orderId;
    })
    
    if(commandIndex>-1){
      this.commands[commandIndex].amountPaid += amountPaid;
      this.commands[commandIndex].amountUnpaid -= amountPaid;
    }

  }
  

  updateCommandTableByOrder(){
      let index = this.commands.findIndex(command=>{
        return command.orderId === this.deletedOrderId;
      })
      console.log("Index retrieved", index);
      if(index>-1){
        console.log("Sliced command: ",this.commands.splice(index,1)); 

        this.dataSource = new MatTableDataSource(this.commands);
      }

  }
  
  onMakeOrder(orderId:number){
    this.router.navigateByUrl(`/admin/order/${orderId}`);
  }

}



