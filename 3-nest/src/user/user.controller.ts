import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get("/all")
    getAll(){
        return this.userService.getAll();
    }

    @Post("/addId")
    addId(@Body() body:any){
        return this.userService.addId(body);        

    }

    @Get('/all/:id')
    getOne(@Param("id") id:number) {
      return this.userService.getId(id);
    }

    @Delete('/removeId/:id')
    deleteId(@Param("id") id: number){
        return this.userService.deleteId(id);
    }

    @Put('/changeData/:id')
    changeData(@Param("id") id:number, @Body() body: any){
        return this.userService.changeData(id, body);
    }

    @Post('/login')
    loginUser(@Body("email") email:string, @Body("password") password:string){
        return this.userService.login(email, password);
    }


    @Get('/search/:term')
    search(@Param("term") term: any){
        return this.userService.search(term);
    }
}