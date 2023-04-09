import { Product } from "./product";
import { ShopOrder } from "./shop-order";

export class OrderDetail{
    id!: number;
    quantity!: number;
    product!: Product;
    shopOrder!: ShopOrder;
}