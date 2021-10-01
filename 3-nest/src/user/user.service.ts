import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Helper } from './user.resources/helper';


@Injectable()
export class UserService {

    private users: Map<number,User> = new Map<number,User>();
    private loginU: Map<string,string> = new Map<string,string>();

    getAll(){
        var populatedData = [];
        for(const [number, users] of Helper.populate()){
           users.log();
        }
        return populatedData;
    }

    logAllId(){
        for(const [number,users] of this.users.entries()){
          console.log(number);
          users.log();
        }
    }
    addId(id:any){
        var newId: User;
        newId = new User(id?.name, id?.age, id?.email, id?.password);
        this.users.set(id.id, newId);
        this.loginU.set(id.email,id.password);
        this.logAllId();
    }

    getId(id:number){
       console.log(this.users.get(id).toJson());
       return this.users.get(id).toJson();
    }

    deleteId(id:any){
        if(this.users.has(id)){
             this.users.delete(id);
             this.loginU.delete(id);
             console.log(id+" Has been deleted!");
        }
        else console.log(id+" does not exist in database!");
    }

    changeData(id:any, user:any){//Change
        var newId: User;
        newId = new User(id?.name, id?.age, id?.email, id?.password);
        this.users.set(id, newId);
        this.logAllId();
    }

    login(password: string){
        for(const [number,users] of Helper.populate()){
            users.login(password);
        }
    }

    search(temp:any){
        console.log(this.users.get(temp).toJson());
        return this.users.get(temp).toJson();
    }

    
}