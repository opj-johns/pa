import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { Supplier } from 'src/app/model/supplier'

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  supplierForm!: FormGroup;
  supplierId: number = 0;
  supplierToUpdated!: Supplier;

  constructor(private supplierService:SupplierService, private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.supplierId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.createSupplierForm();

    if( this.supplierId !==0 ){
      this.getSupplier();
    }
  }

 
  createSupplierForm(){
    this.supplierForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(2)]),
      tel: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }


  getSupplier(){
    this.supplierService.fetchSupplier(this.supplierId).subscribe({
     next:(data)=>{
      
      // --------------------------------
        this.supplierForm.controls['name'].setValue(data.name);
        this.supplierForm.controls['email'].setValue(data.email);
        this.supplierForm.controls['address'].setValue(data.address);
        this.supplierForm.controls['tel'].setValue(data.tel);
        this.supplierForm.controls['id'].setValue(data.id);
        this.supplierToUpdated = data;

        console.log('fetched supplier ', data);
     }
    })
  }

  onSubmit(){
    if(this.supplierId === 0){
      this.supplierService.saveSupplier(this.supplierForm.value).subscribe({
        next: (data)=>{
          alert('Le founisseur est sauvgardé');
          this.router.navigateByUrl("/admin/supplier");
        },
        error:(err)=>{
          console.log(`Erro saving supplier`, err);
        }
      })
      return;
    }
    this.supplierService.updateSupplier(this.supplierForm.value).subscribe({
      next: (data)=>{
        alert('Le founisseur est mis à jour');
        this.router.navigateByUrl("/admin/supplier");
      },
      error:(err)=>{
        console.log('error updating supplier',err);
      }
    })

    console.log(this.supplierForm.value);
    
  }


  cancel(){
   this.router.navigateByUrl("/admin/supplier")
  }


 



}
