import * as admin from "firebase-admin";
import { CRUDReturn } from "./crud_return.interface";
import { v4 as uid } from 'uuid';
import { Helper } from "./helper";
export class Airlines {
    public id: string;
    public destination: string;
    public origin: string;
    public capacity: number;
    
    public cost: number;
  
    constructor(
        destination: string,
        origin: string,
        capacity: number,
        
        cost: number,
        id?: string,
    ) {
      if (id != undefined) {
        this.id = id;
      } else {
        this.id = Helper.generateUID();
      }
        this.destination = destination;
        this.origin = origin;
        this.capacity = capacity;
        this.cost = cost;
    }

    toJson(){
        return {
            destination: this.destination,
            origin: this.origin,
            capacity: this.capacity,
            
            cost: this.cost,
          };

    }

    async commit(): Promise<CRUDReturn> {
        try {
          var DB = admin.firestore();
          var result = await DB.collection("Airlines").doc(this.id).set(this.toJson());
          return {
            success: true,
            data: this.toJson(),
          };
        } catch (error) {
          console.log("Airlines.committ error message");
          console.log(error.message);
          return { success: false, data: error.message, };
        }
    }

    static async retrieve(id: string): Promise<Airlines> {
        try {
          var DB = admin.firestore();
          var result = await DB.collection("Airlines").doc(id).get();
          if (result.exists) {
            var data = result.data();
            return new Airlines(
              data["capacity"],
              data["cost"],
              data["destination"],
              data["origin"],
              result.id
            );
          } else {
            return null;
          }
        } catch (error) {
          console.log("Airlines.retrieve error");
          console.log(error.message);
          return null;
        }
    }

    async delete(): Promise<boolean> {
        try {
          var DB = admin.firestore();
          await DB.collection("Airlines").doc(this.id).delete();
          return true;
        } catch (error) {
          console.log("User.delete error");
          console.log(error.message);
          return false;
        }
    }

    replaceValues(body: any): boolean {
        try {
          var keys: Array<string> = Helper.describeClass(Airlines);
          keys = Helper.removeItemOnce(keys, "id");
          for (const key of Object.keys(body)) {
            this[key] = body[key];
          }
          return true;
        } catch (error) {
          console.log("User.replaceValues error");
          console.log(error.message);
          return false;
        }
      }
    

    
}



