import { Component, AfterViewInit,ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Product } from 'src/app/model/product';
import { ClientService } from 'src/app/service/client.service';


@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName','email', 'phone', 'address', 'action'];
  dataSource!: MatTableDataSource<Client>;
  clients!: Client[];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private clientService: ClientService,private router: Router) {
    
    
   }

  ngOnInit(): void {
    this.getClients();
  }

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClients(){
    this.clientService.fetchClients().subscribe({
      next: (data)=>{
         this.clients = data;
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.clients);
          console.log("clients fetched successfully", data);

          // initialize paginator and sort 
          if(this.dataSource !== undefined && this.paginator !== undefined ){

            this.dataSource.paginator = this.paginator;
            
          }else{ console.log('undefined datasource ') }
          if(this.dataSource.sort !== undefined && this.sort !== undefined){
            this.dataSource.sort = this.sort;
      
          }else{ console.log('undefined datasource') }
        },
      error: (error)=>{console.log(`error fetching clients for client table`)}
    })
  }


  goToForm(product: Product){
    this.router.navigateByUrl(`admin/client/form/${product.id}`);
}

  deleteClient(client: Client){
    if(confirm(`Voulez-vous supprimer ${client.lastName}?`)){
      this.clientService.deleteClient(client).subscribe({
        next:(data)=>{ alert(`Le client est supprimé`)}
      })
    }
  }
}

