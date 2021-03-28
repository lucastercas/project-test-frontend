import cache from 'helpers/rxjs-operators/cache';
import IUser from 'interfaces/models/user';
import IUserRole from 'interfaces/models/userRole';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Observable<IPaginationResponse<IUser>> {
    return this.apiService.get('/admin/user', params);
  }

  public current(): Observable<IUser> {
    return this.apiService.get('/admin/user/current');
  }

  public roles(refresh: boolean = false): Observable<IUserRole[]> {
    return this.apiService.get('/admin/user/roles').pipe(cache('user-service-roles', { refresh }));
  }

  public save(model: Partial<IUser>): Observable<IUser> {
    return this.apiService.post('/admin/user', model);
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`/admin/user/${id}`);
  }
}

const userService = new UserService(apiService);
export default userService;
