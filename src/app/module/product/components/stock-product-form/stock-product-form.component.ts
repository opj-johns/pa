import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { Supplier } from 'src/app/model/supplier';
import { CategoryService } from 'src/app/service/category.service';
import { ProductPhotoService } from 'src/app/service/product-photo.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';



@Component({
  selector: 'app-stock-product-form',
  templateUrl: './stock-product-form.component.html',
  styleUrls: ['./stock-product-form.component.scss']
})
export class StockProductFormComponent implements OnInit {

  @ViewChild('imageInput') myInputRef!: ElementRef<HTMLInputElement>;
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  


  categories!: Category[];
  suppliers!: Supplier[];
  productForm!: FormGroup;
  
  newProduct!: Product;
  imageFormData: FormData = new FormData();

  oldProduct!: Product;

  url="";



  constructor(private productService: ProductService, 
              private productPhotoService: ProductPhotoService,
              private categoryService: CategoryService,
              private supplierService: SupplierService, 
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    let paramValue = this.activatedRoute.snapshot.paramMap.get("id");
    let productId;
    if(paramValue!==null){
     productId = Number(paramValue);
     this.fetchProduct(productId);
    }
    console.log("product id =", productId);

    this.createProductForm();
    // fetch suppliers
    this.loadSuppliers();

    // fetch categories
    this.loadCategories();
  }


  fetchProduct(productId: number){
    this.productService.fetchProduct(productId).subscribe({
      next:(data)=>{
        this.oldProduct = data;
        console.log("Fetched product",data);
        this.updateProductForm(data);
        
       
      },
      error:(err)=>{
        console.log("error fecting product ", err);
      }
    })
  }

  updateProductForm(product: Product){
    this.productForm = new FormGroup({
      id:new FormControl(product.id),
      name: new FormControl(product.name, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(product.description, [Validators.required, Validators.minLength(5)]),
      price: new FormControl(product.price, [Validators.required, Validators.min(10)]),
      categoryId: new FormControl("", [Validators.required]),
      supplierId: new FormControl("", [Validators.required])
    })   
  }

   

  createProductForm(){
    this.productForm = new FormGroup({
      id:new FormControl(""),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.min(10)]),
      categoryId: new FormControl('', [Validators.required]),
      supplierId: new FormControl('', [Validators.required])
    })
  }


  onFileChanged(event:Event){
      //select file
      // .files does not exist on type EventTarget so we typecast to HTMLInputElement 
      console.log('value of element',this.myInputRef);
      let lastFileIndex= (event.target as HTMLInputElement).files!.length-1
      this.selectedFile = (event.target as HTMLInputElement).files![lastFileIndex];
      console.log('value of element',this.myInputRef.nativeElement.value);
      
      console.log(lastFileIndex);
      this.imageFormData.append('image', this.selectedFile , this.selectedFile.name);

      // display image preview
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: any)=>{
        this.url = event.target.result;
        console.log(event);
      }

      // console.log(event);
  }

    //Gets called when the user clicks on submit to upload the image
  uploadImage(){
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    console.log(this.imageFormData);
    //Make a call to the Spring Boot Application to save the image
    this.productPhotoService.saveImage(this.imageFormData).subscribe({
      next:(data)=>{
        // this.base64Data = data;
        alert("image loaded successfully");
        console.log(data);
      }, 
      error:(err)=>{
        // alert("Image unable to be saved.");
        console.log(err);
      }
    })
  }

  getImage(){
    this.productService.getImage(this.imageName).subscribe({
      next:(data)=>{
        this.retrieveResonse = data;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/png;base64,' + this.base64Data;
      }
    })
  }
  

  loadCategories(){
    this.categoryService.fetchAll().subscribe({
      next:(data)=>{
            this.categories = data;
            console.log("fetched categories", data);
      },
      error:(err)=>{
             console.log("Unable to load categories", err);
      }
    })
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

  onSubmit(){
    
    this.uploadImage();

    this.prepareNewProduct();

    this.saveNewProduct();
    
  }

  prepareNewProduct(){
    //  alert("Submit button clicked");
   
    let product = new Product();
    if(this.oldProduct){
      product.id = this.oldProduct.id;
    }
    product.description = this.productForm.controls["description"].value;
    product.name = this.productForm.controls["name"].value;
    product.price = this.productForm.controls["price"].value;
  
    // add imageUrl from uploaded image
    product.imageUrl = this.selectedFile.name;

    // add supplier to product
    let supplierId = Number(this.productForm.controls["supplierId"].value);
    let supplier = this.suppliers.find(supplier =>{
      return supplier.id === supplierId;
    });

    if(supplier!==undefined){
      product.supplier = supplier;
    }

     // add category to product
    let categoryId = Number(this.productForm.controls["categoryId"].value);
    let category = this.categories.find(category =>{
        return category.id === categoryId;
    })
    if(category!==undefined){
      product.category = category;
    }

    this.newProduct = product;
    console.log("prepared product to be saved",product);
  }

  saveNewProduct(){
    this.productService.saveProduct(this.newProduct).subscribe({
      next: (data)=>{
        console.log("Product saved successfully",data);
        alert("Product saved successfully");
        this.url="";
        this.myInputRef.nativeElement.value ='';
        this.imageFormData= new FormData();
        this.productForm.reset();
      },
      error:(err)=>{
        console.log("OOPS!, error saving product", err);
      }
    })
  }

}
