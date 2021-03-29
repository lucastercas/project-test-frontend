import { IOrderProduct } from './IOrderProduct';

export interface IOrder {
  id: number;
  products: IOrderProduct[];
}
