import { CRUDReturn } from './user.resources/crud_return.interface';
import { Helper } from './user.resources/helper';
import { database } from 'firebase-admin';
import * as admin from 'firebase-admin';
export class User {
  public id: string;
  private name: string;
  private age: number;
  private email: string;
  private password: string;

  constructor(name?: string, age?: number, email?: string, password?: string, id?: string) {
    if(id!=undefined) this.id = id;
    else this.id = Helper.generateUID();
    this.name = name;
    this.email = email;
    this.age = age;
    this.password = password;
  }
 
  static async retrieve(id: string){
    try {
      var DB = admin.firestore();
      var result  = await DB.collection("users").doc(id).get();
      if(result.exists)
        return new User(result.data()["name"], result.data()["age"], result.data()["email"], result.data()["password"], result.id);
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  async commit(): Promise<CRUDReturn>{
    try {
      var DB = admin.firestore();
      var result  = await DB.collection("users").doc(this.id).set(this.toJson());
      return {success: true, data: this.toJsonID()};
    } catch (error) {
      console.log(error);
      return {success: false, data:error};
    }

  }
    
    



  login(password: string): CRUDReturn {
    try {
      if (this.password === password) {
        return { success: true, data: this.toJson() };
      } else {
        throw new Error(`${this.email} login fail, password does not match`);
      }
    } catch (error) {
      return { success: false, data: error.message };
    }
  }

   matches(term: string): Boolean {
    var keys: Array<string> = Helper.describeClass(User);
    keys = Helper.removeItemOnce(keys, 'password');
    for(const key of keys){
      if(`${this[key]}` === term) return true;  
    }
    return false;
  }

  
  replaceValues(body: any): Boolean {
    try {
      var keys : Array<string> = Helper.describeClass(User);
      keys = Helper.removeItemOnce(keys, "id");
      for(const key of Object.keys(body)) {
          this[key] = body[key];
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  log() {
    console.log(this.toJson());
  }

  toJson() {    
     return{
         Name: this.name,
         Age: this.age,
         Email: this.email,
     }
  }

  toJsonID() {    
    return{
        Id: this.id,
        Name: this.name,
        Age: this.age,
        Email: this.email,
    }
 }
  
  Patch
  updateValues(body: any): Boolean {
    if(body.name){
      if(typeof body.name === 'string'){
        this.name = body.name;
      }
    }
    if(body.age){
      if(typeof body.age === typeof 0){
        this.age = body.age;
      }
    }
    if(body.email){
      if(typeof body.email === 'string'){
        this.email = body.email;
      }
    }
    if(body.password){
      if(typeof body.password === 'string'){
        this.password = body.password;
      }
    }
    return true;
  }
  
}