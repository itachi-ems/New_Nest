import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { USER } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { hasRoles } from "../decorator/roles.decorator";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserService))
        private userService: UserService
        
        //Circular Dependency : 2 class depend on eachother
        //user module <=> AuthModule

    ){} 
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles',context.getHandler());
        if(!roles){
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user: USER = request.user.user;

        return this.userService.findOne(user.id).pipe(
            map((user: USER) => {
                const hasRoles = () => roles.indexOf(user.role) > -1;
                let hasPermission : boolean = false;

                if(hasRoles()) {hasPermission = true}
                return user && hasPermission;
            })
        )

        return true;
    }
    }