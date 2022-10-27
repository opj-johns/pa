import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';


@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrls: ['./supplier-table.component.scss']
})
export class SupplierTableComponent implements OnInit{

  displayedColumns: string[] = ['name', 'email', 'address','tel', 'actions'];
  dataSource!: MatTableDataSource<Supplier>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  suppliers!: Supplier[];

  constructor(private supplierService: SupplierService,private router:Router) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  getAllSuppliers(){
    this.supplierService.fetchAll().subscribe({
      next:(data)=>{
        this.suppliers = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.suppliers);
        console.log(`fetched suppliers:`, this.suppliers);

        if(this.dataSource !== undefined && this.paginator !== undefined ){

          this.dataSource.paginator = this.paginator;
          
        }else{ console.log('undefined datasource') }
        if(this.dataSource.sort !== undefined && this.sort !== undefined){
          this.dataSource.sort = this.sort;
    
        }else{ console.log('undefined datasource') }
      },
      error:(err)=>{console.log('error fetching suppliers', err)}
    })
  }

  openSupplierForm(id:number){
     this.router.navigateByUrl(`/admin/supplier/form/${id}`);
  }


  deleteSupplier(supplier:Supplier){
    if(confirm(`Voulez-vous supprimer ${supplier.name}?`)){

      this.supplierService.deleteSupplier(supplier).subscribe({
        next: (data)=>{
          alert("Le donnee du founisseur es supprimer");
        },
        error:(err)=>{
          console.log('error deleting supplier', err);
        }
      })
    }
  }


}


