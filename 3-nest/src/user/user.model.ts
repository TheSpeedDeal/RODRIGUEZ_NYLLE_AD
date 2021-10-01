import { CRUDReturn } from './user.resources/crud_return.interface';
import { Helper } from './user.resources/helper';
export class User {
  public id: string;
  private name: string;
  private age: number;
  private email: string;
  private password: string;

  constructor(name: string, age: number, email: string, password: string) {
    this.id = Helper.generateUID();
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
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
    var change: number = 0;
    if(body.name){
      if(typeof body.name === 'string'){
        this.name = body.name;
        change++;
      }
    }
    if(body.age){
      if(typeof body.age === typeof 0){
        this.age = body.age;
        change++;
      }
    }
    if(body.email){
      if(typeof body.email === 'string'){
        this.email = body.email;
        change++;
      }
    }
    if(body.password){
      if(typeof body.password === 'string'){
        this.password = body.password;
        change++;
      }
    }
    if(change === 4) return true;
    else return false;
  }

  log() {
    console.log(this.toJson());
  }

  toJson() {    
     return{
         Id: this.id,
         Name: this.name,
         Age: this.age,
         Email: this.email,
     }
  }

  //Patch
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