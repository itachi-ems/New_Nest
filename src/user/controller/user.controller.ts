import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { USER, UserRole } from '../models/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: USER): Observable<USER | Object> {
        return this.userService.create(user).pipe(
            map((user: USER) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: USER): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(':id')
    findOne(@Param() params): Observable<USER> {
        return this.userService.findOne(params.id);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    index(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Observable<Pagination<USER>> {
        limit = limit > 100 ? 100 : limit;
        
        return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users'});
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: USER): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id:string,@Body() user: USER): Observable<USER>{
        return this.userService.updateRoleOfUser(Number(id),user);
    }

}