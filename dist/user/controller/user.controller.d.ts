import { UserService } from '../service/user.service';
import { USER } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: USER): Observable<USER | Object>;
    login(user: USER): Observable<Object>;
    findOne(params: any): Observable<USER>;
    index(page?: number, limit?: number): Observable<Pagination<USER>>;
    deleteOne(id: string): Observable<any>;
    updateOne(id: string, user: USER): Observable<any>;
    updateRoleOfUser(id: string, user: USER): Observable<USER>;
}
