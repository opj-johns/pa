import {Client} from "./client";
import {Employee} from "./employee";

export class ShopOrder{
    id!: number;
    date!: Date;
    client!: Client;
    employee!: Employee;
    orderStatus!: OrderStatus;
}

interface OrderStatus{
    id: number;
    status: string;
}