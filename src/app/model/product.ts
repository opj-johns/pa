import { Category } from "./category";
import { Supplier } from "./supplier";

export class Product{
    id!: number;
    name!:string;
    description!: string;
    qtyInStock!: number;
    imageUrl!: string;
    price!:number;
    
    category!: Category;
    supplier!: Supplier;
}












