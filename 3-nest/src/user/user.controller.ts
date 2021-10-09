import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Helper } from './user.resources/helper';
import { database } from 'firebase-admin';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}


    //register
    @Post('/register')
        register(@Body() body: any) {
        return this.userService.addId(body);
    }
    //login
    @Post('/login')
        login(@Body('email') email: string, @Body('password') password: string) {
        return this.userService.login(email, password);
    }
    //get all users
    @Get('/all')
        getAllUser() {
       return this.userService.getAll();
    }
    //search 1 user
    @Get('/search/:term')
        searchUser(@Param('term') term: string) {
        return this.userService.search(term);
    }

  @Get('/get/:id')
  getUserID(@Param('id') id: string) {
    return this.userService.getId(id);
  }

  //change tanan
  @Put('/:id')
  replaceValuePut(@Param('id') id: string, @Body() body: any) {
    return this.userService.changeData(id, body);
  }

  //change one or something
  @Patch('/:id')
  replaceValuePatch(@Param('id') id: string, @Body() body: any) {
    return this.userService.updateId(id, body);
  }

  //delete
  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteId(id);
  }


}