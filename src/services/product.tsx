import { IProduct } from 'components/Pages/Admin/Products/List/ListProduct';
import { IPaginationParams } from 'interfaces/pagination';
import apiService, { ApiService } from './api';

export class ProductService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams) {
    const products = this.apiService.get('/app/product', params);
    console.log(products);
    return products;
  }

  public delete(id: number) {
    return this.apiService.delete(`/app/product/${id}`);
  }

  public save(model: Partial<IProduct>) {
    return this.apiService.post(`/app/product`, model);
  }
}

const productService = new ProductService(apiService);
export default productService;
