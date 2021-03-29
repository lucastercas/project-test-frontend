import { IOrderProduct } from 'interfaces/models/IOrderProduct';

export default interface IUserToken {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];
  exp: number;
  orders: IOrderProduct[];
  fullName: string;
}
