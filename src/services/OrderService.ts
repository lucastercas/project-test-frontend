import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import { Observable } from 'rxjs';
import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}

  public list() {
    return this.apiService.get('/app/order');
  }

  public post(model: Partial<IOrderProduct[]>, userId: number): Observable<any> {
    return this.apiService.post('/app/order', { userId: userId, products: [...model] });
  }
}

const orderService = new OrderService(apiService);
export default orderService;
