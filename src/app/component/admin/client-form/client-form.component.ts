import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm!: FormGroup;  
  existingClient!: Client;
  clientId!: number;

  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService,private router: Router) { }

  ngOnInit(): void {

    this.clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.newClientForm();

    console.log(this.clientId);
     
    if(this.clientId !== 0){
 
      this.getClient();
      

    }
  }

  getClient(){
    this.clientService.getClient(this.clientId).subscribe({
    next: (data)=>{

       this.existingClient = data;
       console.log('fetched client successfully', data);
       this.fillForm();
      // this.newClientForm();

    },
    error:(error)=>{
      console.log('failed to get client',error);
    }
   })


  }

  newClientForm(){
    this.clientForm = new FormGroup({
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone:  new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.minLength(2)]),
      id: new FormControl('')
    })

    console.log(this.clientForm);
  }

  fillForm(){
    this.clientForm.controls['firstName'].setValue(`${this.existingClient.firstName}`);
    this.clientForm.controls['lastName'].setValue(`${this.existingClient.lastName}`);
    this.clientForm.controls['email'].setValue(`${this.existingClient.email}`);
    this.clientForm.controls['address'].setValue(`${this.existingClient.address}`);
    this.clientForm.controls['phone'].setValue(`${this.existingClient.phone}`);
    this.clientForm.controls['id'].setValue(`${this.existingClient.id}`);
  }

  onSubmit(){
     if(this.clientId === 0){
       this.clientService.saveClient(this.clientForm.value).subscribe({
        next:(data)=>{ 
             alert("Le client est sauvegardé"); 
             console.log('saved client', data); 
             this.router.navigateByUrl("/admin/client")
            }
       });
     }else{
      this.clientService.updateClient(this.clientForm.value).subscribe({
        next:(data)=>{ 
            alert("Le client est mis à jour"); 
            console.log('saved client', data);
            this.router.navigateByUrl("/admin/client");
          }
       });
     }
  }

   cancel(){
    this.router.navigateByUrl("/admin/client");
   }

}
