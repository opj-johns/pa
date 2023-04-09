import { PaymentType } from "./payment-type";
import { ShopOrder } from "./shop-order";

export class Payment{
    id!:number;
    amountPaid!:number;
    shopOrder!: ShopOrder;
    paymentType!: PaymentType;
}