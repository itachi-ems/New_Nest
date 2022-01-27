import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { USER } from 'src/user/models/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJWT(user: USER): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePasswords(newPassword: string, passwortHash: string): Observable<any | boolean>;
}
