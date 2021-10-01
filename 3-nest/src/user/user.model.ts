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

   matches(term: string)/**: Boolean */{
    try {
        if (this.id === term) {
          return { success: true, data: this.toJson() };
        } else {
          throw new Error(`${this.email} Does not Match`);
        }
      } catch (error) {
        return { success: false, data: error.message };
      }
   
  }

  replaceValues(body: any)/**: Boolean */{
   //hehe you didn't think I would actually give you the answers, yes?
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
         Password: this.password,
     }
  }
}