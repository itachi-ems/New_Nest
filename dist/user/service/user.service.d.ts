import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { USER } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(user: USER): Observable<USER>;
    findOne(id: number): Observable<USER>;
    findAll(): Observable<USER[]>;
    paginate(options: IPaginationOptions): Observable<Pagination<USER>>;
    deleteOne(id: number): Observable<any>;
    updateOne(id: number, user: USER): Observable<any>;
    login(user: USER): Observable<string>;
    validateUser(email: string, password: string): Observable<USER>;
    findByMail(email: string): Observable<USER>;
    updateRoleOfUser(id: number, user: USER): Observable<any>;
}
