import { Injectable } from '@nestjs/common';
import { debug } from 'console';
import { ObjectUnsubscribedError } from 'rxjs';
import { User } from './user.model';
import { CRUDReturn } from './user.resources/crud_return.interface';
import { Helper } from './user.resources/helper';


@Injectable()
export class UserService {

    private users: Map<number,User> = new Map<number,User>();

    getAll(){
        var populatedData = [];
        for(const [number, users] of Helper.populate()){
            users.log();
         }
        for(const [number, users] of this.users.entries()){
           users.log();
        }
        return populatedData;
    }

    logAllId(){
        var populatedData = [];
        for(const [number,users] of this.users.entries()){
          console.log(number);
          users.log();
        }
        return populatedData;
    }


    login(id:any){
        var newId: User;
        newId = new User(id?.name, id?.age, id?.email, id?.password);
        this.users.set(id.id, newId);
        this.logAllId();
    }

    getId(id:number){
       console.log(this.users.get(id).toJson());
       return this.users.get(id).toJson();
    }

    deleteId(id:any){
        if(this.users.has(id)){
             this.users.delete(id);
             console.log(id+" Has been deleted!");
        }
        else console.log(id+" does not exist in database!");
    }

    changeData(id:any, user:any): CRUDReturn{//Change
        try{
            var validBody: {valid: boolean; data: string} = Helper.validBody(id);
            if(validBody.valid){
                if(!this.emailExist(user.email)){
                    if(!user.replaceValues(user)){
                        var newUser: User = new User(user?.name, user?.age, user?.email, user?.password);
                        this.users.set(user.id, newUser);
                    }else throw new Error(validBody.data);

                    if(this.saveToDB(user.id)){
                        if(debug) this.logAllId();
                        return{ success: true, data: user.id.toJson()};
                    }
                    else{
                        throw new Error("Error");
                    }

                }
                else{
                    throw new Error("Error");
                }
            }
            else{
                throw new Error(validBody.data);
            }

        }catch(error){
            console.log(error.message);
            return {success: false, data: `Error, ${error.message}`};
        }
    }

    addId(body: any): CRUDReturn{
        try{
            var validBody: {valid: boolean; data: string} = Helper.validBody(body);
            if(validBody.valid){
                if(!this.emailExist(body.email)){
                    var newUser: User = new User(body.name, body.age, body.email, body.password);
                    if(this.saveToDB(newUser)){

                        if(debug) this.logAllId();
                        return{ success: true, data: newUser.toJson()};
                    }
                    else{
                        throw new Error("Error");
                    }

                }
                else{
                    throw new Error("Error");
                }
            }
            else{
                throw new Error(validBody.data);
            }

        }catch(error){
            console.log(error.message);
            return {success: false, data: `Error, ${error.message}`};
        }
    }

    search(temp:any){
        console.log(this.users.get(temp).toJson());
        return this.users.get(temp).toJson();
    }

    

    saveToDB(user: User): boolean{
        try{
            this.users.set(parseInt(user.id), user);
            return this.users.has(parseInt(user.id));
        }catch(error){
            console.log(error);
            return false;
        }
    }

    emailExist(email:string, options?:{exeptionalId: string}){
        for(const user of this.users.values()){
            if(user.matches(email)){
                if(options?.exeptionalId!=undefined && user.matches(options.exeptionalId)) continue;
                else return true;

            }

        }
        return false;
    }


    updateId(id:any, user:any): CRUDReturn{
          try{
            var validBody: {valid: boolean; data: string} = Helper.validBody(id);
            if(validBody.valid){
                if(!this.emailExist(user.email)){
                    if(!id.updateValues(id)){
                        var newUser: User = new User(user?.name, user?.age, user?.email, user?.password);
                        this.users.set(id.id, newUser);
                    }else throw new Error(validBody.data);
                    
                    if(this.saveToDB(id.id)){
                        if(debug) this.logAllId();
                        return{ success: true, data: id.id.toJson()};
                    }
                    else{
                        throw new Error("Error");
                    }

                }
                else{
                    throw new Error("Error");
                }
            }
            else{
                throw new Error(validBody.data);
            }

        }catch(error){
            console.log(error.message);
            return {success: false, data: `Error, ${error.message}`};
        }

    }
}



