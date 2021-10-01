import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Helper } from './user.resources/helper';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get("/all")//GenerateID
    getAll(){
        return this.userService.getAll();
    }

    @Post("/addId")//register
    addId(@Body() body:any){    
        return this.userService.addId(body);        

    }

    @Get('/all/:id')
    getOne(@Param("id") id:number) {
      return this.userService.getId(id);
    }

    @Delete('/removeId/:id')
    deleteId(@Param("id") id: any){
        return this.userService.deleteId(id);
    }

    @Put('/changeData/:id')
    changeData(@Param("id") id:number, @Body() body: any){
        return this.userService.changeData(id, body);
    }

    @Post('/login')
    loginUser(body:any){  
        return this.userService.login(body);
    }


    @Get('/search/:term')
    search(@Param("term") term: any){
        return this.userService.search(term);
    }

    @Get("/logall")
    logAll(){
        return this.userService.logAllId();
    }

    @Patch("/updateId/:id")
    updateId(@Param("id") id:number, @Body() body: any){
        return this.userService.updateId(id,body);
    }


}