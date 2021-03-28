import { IOrder } from 'interfaces/models/IOrder';

export default interface IUserToken {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];
  exp: number;
  orders: IOrder[];
  fullName: string;
}
