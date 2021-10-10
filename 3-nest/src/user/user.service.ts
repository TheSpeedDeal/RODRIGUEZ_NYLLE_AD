import { Injectable } from '@nestjs/common';
import { debug } from 'console';
import { ObjectUnsubscribedError } from 'rxjs';
import { User } from './user.model';
import { CRUDReturn } from './user.resources/crud_return.interface';
import { Helper } from './user.resources/helper';
import { database } from 'firebase-admin';
import * as admin from 'firebase-admin';


@Injectable()
export class UserService {

  private users: Map<String, User> = new Map<String, User>();
  private DB = admin.firestore();

  constructor() {
    this.users = Helper.populate();
  }

  //Get all users
  async getAll(): Promise<CRUDReturn> {
    var results: Array<any> = [];
    try {
      var allUsers = await this.getAllUserObject();
      allUsers.forEach((user) => {

        results.push(user.toJsonID());
        console.log(user.toJsonID());
      });
    } catch (e) {
      return { success: false, data: e };
    }
  }

  async getAllUserObject(): Promise<Array<any>> {
    var results: Array<any> = [];
    try {
      var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
        await this.DB.collection("users").get();
        dbData.forEach((doc) => {
          if(doc.exists){
            var data = doc.data();
            results.push(new User(
              data["name"],
              data["age"],
              data["email"],
              data["password"],
              data["id"],
            ));
          }
        });
        return results;
    } catch (e) {
      return null;
    }

  }




  //login in user
  async login(email: any, password: any) {
    for (const user of this.users.values()) {
      if (user.matches(email)) {
        console.log(email, password);
        return user.login(password);
      }
    }
    return { success: false, data: `${email} not found in database` };
  }

  //get 1 user
  async getId(id: any): Promise<CRUDReturn> {
    if (this.users.has(id)) {
      return { success: true, data: this.users.get(id).toJson() };
    }
    else {
      return { success: false, data: `User ${id} is not in database` };
    }
  }

  //Delete user
  async deleteId(id: any): Promise<CRUDReturn> {
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
  async changeData(id: any, body: any): Promise<CRUDReturn> {//Change
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
  async addId(body: any): Promise<CRUDReturn> {
    try {
      var validBody: { valid: boolean; data: string } = Helper.validBody(body);
      if (validBody.valid) {
        if (!this.emailExist(body.email)) {
          var newUser: User = new User(body.name, body.age, body.email, body.password);
          if (await this.saveToDB(newUser)) {
            if (debug) this.logAllUsers();
            return { success: true, data: newUser.toJson() };
          }
          else {
            throw new Error("Error");
          }
        }
        else {
          throw new Error(`${body.email} is in use`);
        }
      }
      else {
        throw new Error(validBody.data);
      }
    }
    catch (error) {
      console.log(error.message);
      return { success: false, data: `Error adding account, ${error.message}` };
    }
  }

  //Search
  async search(temp: any): Promise<CRUDReturn> {
    var results: Array<any> = [];
    for (const user of this.users.values()) {
      if (user.matches(temp)) results.push(user.toJson());
    }
    return { success: results.length > 0, data: results };
  }

  //sadadasd

  async saveToDB(user: User): Promise<boolean> {
    try {
      var result = await user.commit();
      return result.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async emailExist(email: string, options?: { exeptionalId: string }): Promise<boolean> {
   try {
     var userResult = await this.DB.collection("users").where("email", "==", email).get();
     console.log("User Result empty?");
     console.log(userResult.empty);
     if(userResult.empty)return false;
     for(const doc of userResult.docs){
        console.log(doc.data());
        console.log("Options Defined?");
        console.log(options != undefined);
        if(console != undefined){
          if(doc.id == options?.exeptionalId)continue;
        }
        if(doc.data()["email"] === email) return true;
        else return false;
     }
     return false;
   } catch (error) {
     console.log(error);
     return false;
   }
  }

  //asdadsasda

  //Patch
  async updateId(id: any, body: any): Promise<CRUDReturn> {
    try {
      if (this.users.has(id)) {
        var validBodyPatch: { valid: boolean; data: string } =
          Helper.validBody(body);
        if (validBodyPatch.valid) {
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

