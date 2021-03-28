import { IOrder } from 'interfaces/models/IOrder';
import { Observable } from 'rxjs';
import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}

  public list() {
    const orders = this.apiService.get('/app/order');
    console.log('Orders: ', orders);
    return orders;
  }

  public post(model: Partial<IOrder[]>): Observable<any> {
    console.log('Posting: ', model);
    const result = this.apiService.post('/app/order', { userId: 1, products: [...model] });
    console.log('Result: ', result);
    return result;
  }
}

const orderService = new OrderService(apiService);
export default orderService;
