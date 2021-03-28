import { IOrder } from 'interfaces/models/IOrder';
import IUserToken from 'interfaces/tokens/userToken';
import { useObservable } from 'react-use-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import apiService, { ApiService } from './api';
import authService from './auth';

export class OrderService {
  constructor(private apiService: ApiService) {}

  public list() {
    return this.apiService.get('/app/order');
  }

  public post(model: Partial<IOrder[]>, userId: number): Observable<any> {
    return this.apiService.post('/app/order', { userId: userId, products: [...model] });
  }
}

const orderService = new OrderService(apiService);
export default orderService;
