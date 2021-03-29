import { IOrder } from 'interfaces/models/IOrder';
import { IOrderProduct } from 'interfaces/models/IOrderProduct';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';
import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Observable<IPaginationResponse<IOrder>> {
    return this.apiService.get('/app/order', params);
  }

  public post(model: Partial<IOrderProduct[]>, userId: number): Observable<any> {
    return this.apiService.post('/app/order', { userId, products: [...model] });
  }
}

const orderService = new OrderService(apiService);
export default orderService;
