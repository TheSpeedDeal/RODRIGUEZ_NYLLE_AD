import * as admin from "firebase-admin";

import { Injectable } from '@nestjs/common';
import { CRUDReturn } from "./airlines.resources/crud_return.interface";
import { Helper } from "./airlines.resources/helper";
import { Airlines } from "./airlines.resources/airlines.model";


@Injectable()
export class AirlinesService {
    private DB = admin.firestore();
    constructor() {}

    async register(body: any): Promise<CRUDReturn> {
        try {
          var validBody: { valid: boolean; data: string } =
            Helper.validBodyPut(body);
          if (validBody.valid) {
              var newAirlines: Airlines = new Airlines(
                body.destination,
                body.origin,
                body.bookings,
                body.capacity,
                
                body.cost,
              );
              if (await this.saveToDB(newAirlines)) {
                // if (DEBUG) await this.logAllAirliness();
                return {
                  success: true,
                  data: newAirlines.toJson(),
                };
              } else {
                throw new Error("generic database error");
              }
          } else {
            throw new Error(validBody.data);
          }
        } catch (error) {
          console.log("RegisterError");
          console.log(error.message);
          return { success: false, data: `Error adding account, ${error}` };
        }
      }

      async deleteAirlines(id: string): Promise<CRUDReturn> {
        try {
          var user: Airlines = await Airlines.retrieve(id);
          if (user != null) {
            var success: boolean = await user.delete();
            return {
              success: success,
              data: `Airlines ${id} has been successfully removed`,
            };
          } else
            return {
              success: false,
              data: `Airlines ${id} is not in database`,
            };
        } catch (error) {
          console.log("DeleteError");
          console.log(error.message);
          return {
            success: false,
            data: error.message,
          };
        }
    }

    async replaceValuePut(id: string, body: any): Promise<CRUDReturn> {
        try {
          var user: Airlines = await Airlines.retrieve(id);
          if (user != null) {
            var validBodyPut: { valid: boolean; data: string } =
              Helper.validBodyPut(body);
            if (validBodyPut.valid) {
                var success = user.replaceValues(body);
                await user.commit();
                if (success)
                  return {
                    success: success,
                    data: user.toJson(),
                  };
                else {
                  throw new Error("Failed to update user in db");
                }
            } else {
              throw new Error(validBodyPut.data);
            }
          } else {
            throw new Error(`Airlines ${id} is not in database`);
          }
        } catch (error) {
          console.log("PutError");
          console.log(error.message);
          return {
            success: false,
            data: error.message,
          };
        }
      }
    
      async replaceValuePatch(id: string, body: any): Promise<CRUDReturn> {
        try {
          var user: Airlines = await Airlines.retrieve(id);
          if (user != null) {
            var validBodyPatch: { valid: boolean; data: string } =
              Helper.validBody(body);
            if (validBodyPatch.valid) {
              var success = user.replaceValues(body);
              console.log(user.toJson());
              await user.commit();
              if (success) {
                return {
                  success: success,
                  data: user.toJson(),
                };
              } else {
                throw new Error("Failed to update user");
              }
            } else {
              throw new Error(validBodyPatch.data);
            }
          } else {
            throw new Error(`Airlines ${id} is not in database`);
          }
        } catch (error) {
          console.log("PatchError");
          console.log(error.message);
          return {
            success: false,
            data: error.message,
          };
        }
      }


  //secondary functions

  async saveToDB(user: Airlines): Promise<boolean> {
    console.log(`Attempting to save Plane ${user.id}`);
    try {
      var result = await user.commit();
      return result.success;
    } catch (error) {
      console.log("Save to db error");
      console.log(error.message);
      return false;
    }
  }

//   async logAllAirliness() {
//     console.log(await this.getAll());
//   }

}
