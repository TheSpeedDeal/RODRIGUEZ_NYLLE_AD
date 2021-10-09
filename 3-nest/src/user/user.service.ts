import { Injectable } from '@nestjs/common';
import { debug } from 'console';
import { ObjectUnsubscribedError } from 'rxjs';
import { User } from './user.model';
import { CRUDReturn} from './user.resources/crud_return.interface';
import { Helper } from './user.resources/helper';
import { database } from 'firebase-admin';
import * as admin from 'firebase-admin';


@Injectable()
export class UserService {

    private users: Map<String,User> = new Map<String,User>();
    private DB = admin.firestore();

    constructor() {
      this.users = Helper.populate();
    }

    //Get all users
    getAll(): CRUDReturn{
        var results: Array<any> = [];
        try {
          for (const user of this.users.values()) {
            results.push(user.toJson());
          }
          return { success: true, data: results };
        } catch (e) {
          return { success: false, data: e };
        }
    }

    //login in user
    login(email:any, password:any){
        for (const user of this.users.values()) {
            if (user.matches(email)) {
              console.log(email,password);
              return user.login(password);
            }
          }
          return { success: false, data: `${email} not found in database` };
    }

    //get 1 user
    getId(id:any): CRUDReturn{
        if (this.users.has(id)) {
          return { success: true, data: this.users.get(id).toJson() };
        } 
        else
        {
          return {success: false, data: `User ${id} is not in database` };
        }
    }

    //Delete user
    deleteId(id:any): CRUDReturn{
        if (this.users.has(id)) {
            return {
              success: this.users.delete(id),
              data: `User ${id} has been successfully removed`,
            };
          } else
            return {
              success: false,
              data: `User ${id} is not in database`,
            };
    }

    //Put
    changeData(id:any, body:any): CRUDReturn{//Change
        try {
            if (this.users.has(id)) {
              var validBodyPut: { valid: boolean; data: string } =
                Helper.validBodyPut(body);
              if (validBodyPut.valid) {
                if (!this.emailExist(body.email, { exeptionalId: id })) {
                  var user: User = this.users.get(id);
                  var success = user.replaceValues(body);
                  if (success)
                    return {
                      success: true,
                      data: user.toJson(),
                    };
                  else {
                    throw new Error('Failed to update user in db');
                  }
                } else {
                  throw new Error(`${body.email} is already in use by another user!`);
                }
              } else {
                throw new Error(validBodyPut.data);
              }
            } else {
              throw new Error(`User ${id} is not in database`);
            }
          } catch (error) {
            return {
              success: false,
              data: error.message,
            };
          }
    }


    //Register
    addId(body: any): CRUDReturn{
        try{
            var validBody: {valid: boolean; data: string} = Helper.validBody(body);
            if(validBody.valid)
            {
                if(!this.emailExist(body.email))
                {
                  var newUser: User = new User(body.name, body.age, body.email, body.password);
                  if(this.saveToDB(newUser))
                  {
                    if(debug) this.logAllUsers();
                    return{ success: true, data: newUser.toJson()};
                  }
                  else
                  {
                    throw new Error("Error");
                  }
                }
                else
                {
                  throw new Error(`${body.email} is in use`);
                }
            }
            else{
              throw new Error(validBody.data);
            }
        }
        catch(error)
        {
          console.log(error.message);
          return { success: false, data: `Error adding account, ${error.message}` };
        }
    }

    //Search
    search(temp:any): CRUDReturn{
        var results: Array<any> = [];
        for (const user of this.users.values()) {
         if (user.matches(temp)) results.push(user.toJson());
        }
         return { success: results.length > 0, data: results };
    }

    //sadadasd

    saveToDB(user: User): boolean{
        try{

            var potato = this.DB.collection("users").doc(user.id).set(user.toJson())
            console.log(potato);


            this.users.set((user.id), user);
            return this.users.has((user.id));
        }catch(error){
            console.log(error);
            return false;
        }
    }

    emailExist(email:string, options?:{exeptionalId: string}){
        for(const user of this.users.values()){
            if(user.matches(email)){
                if(options?.exeptionalId != undefined && user.matches(options.exeptionalId)) 

                continue;

                else return true;
            }
        }
        return false;
    }

    //asdadsasda

    //Patch
    updateId(id:any, body:any): CRUDReturn{
        try {
            if (this.users.has(id)) {
              var validBodyPatch: { valid: boolean; data: string } =
                Helper.validBody(body);
              if (validBodyPatch.valid) {
                if (!this.emailExist(body.email, { exeptionalId:id })) {
                  var user: User = this.users.get(id);
                  var success = user.replaceValues(body);
                  if (success)
                    return {
                      success: true,
                      data: user.toJson(),
                    };
                  else {
                    throw new Error('Failed to update user in db');
                  }
                } else {
                  throw new Error(`${body.email} is already in use by another user!`);
                }
              } else {
                throw new Error(validBodyPatch.data);
              }
            } else {
              throw new Error(`User ${id} is not in database`);
            }
          } catch (error) {
            return {
              success: false,
              data: error.message,
            };
          }
    }


    logAllUsers() {
      console.log(this.getAll());
    }



}

