import { IProduct } from 'interfaces/models/IProduct';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';
import apiService, { ApiService } from './api';

export class ProductService {
  constructor(private apiService: ApiService) {}

  public findById(id: number): Observable<IProduct> {
    return this.apiService.get(`/app/product/${id}`);
  }

  public list(params: IPaginationParams): Observable<IPaginationResponse<IProduct>> {
    return this.apiService.get('/app/product', params);
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`/app/product/${id}`);
  }

  public save(model: Partial<IProduct>): Observable<any> {
    return this.apiService.post('/app/product', model);
  }

  public edit(model: Partial<IProduct>) {
    return this.apiService.put('/app/product', model);
  }
}

const productService = new ProductService(apiService);
export default productService;
