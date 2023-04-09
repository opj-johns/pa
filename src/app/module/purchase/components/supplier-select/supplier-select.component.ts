import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from 'src/app/model/supplier';
import { PurchaseInteractionService } from 'src/app/service/purchase-interaction.service';
import { SupplierService } from 'src/app/service/supplier.service';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

/**/

@Component({
  selector: 'app-supplier-select',
  templateUrl: './supplier-select.component.html',
  styleUrls: ['./supplier-select.component.scss']
})
export class SupplierSelectComponent implements OnInit {
  suppliers!: Supplier[];
  selectedSupplierId!: number;
  @Input()supplierName: string="";
  supplierExists: boolean = true;

  constructor(private supplierService: SupplierService, 
              private purchaseInteractionService:PurchaseInteractionService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(){
    this.supplierService.fetchAll().subscribe({
      next:(data)=>{
            this.suppliers = data;
            console.log("fetched suppliers", data);
      },
      error:(err)=>{
             console.log("Unable to load suppliers", err);
      }
    })
  }

  updateSelectedSupplier(){


    
    if(this.selectedSupplierId!==undefined){
      let selectedSupplier =   this.suppliers.find(supplier=>{
        return supplier.id  === this.selectedSupplierId;
      });
      if(selectedSupplier!==undefined){
        this.purchaseInteractionService.updateSelectedSupplier(selectedSupplier);
      }else{
        console.log("Could not find supplier in suppliers table");
      }
      
    }else{
      console.log("selected supplier id is undefined in supplier select component");
    }
    
    console.log("I am alive" ,this.selectedSupplierId );
  }




}
