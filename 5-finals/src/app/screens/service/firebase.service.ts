import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  object: any;
  userId: any;

  constructor(public firebaseAuth: AngularFireAuth, private api: HttpClient) { }

  loggedIn = false;

  async login(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.loggedIn = true;
      localStorage.setItem('user', email);
    }).catch(()=>{
      window.alert("User is not Here");
    })
  }

  async register(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(()=>{
      this.loggedIn = true;
      localStorage.setItem('user', email);
    })
  }

  async logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }


  
  async updateUser(email:string){
    const auth = getAuth();
    const signedInUser = auth.currentUser;
    var result:any = await this.api.get(environment.API_URL + "/user/search/"+ localStorage.getItem('user')).toPromise();
    this.object = result.data;
    this.userId = `${this.object[0].id}`;
    var user: any = await this.firebaseAuth.currentUser;

    if(signedInUser !== null) {
      const oldEmail = signedInUser.email;
      if(oldEmail == email) window.alert("Email already used please type in a new email");
      else{
        await this.api.patch(environment.API_URL + "/user/replacePatch/"+ this.userId, { 
          "email": email,
        }
        ).toPromise().then(async function(){
          localStorage.setItem('user', email);
          await updateEmail(user, email);
         window.alert("Password updated successfully");
         location.reload();
        }).catch(()=>{
         window.alert("Password already used");
      })
      }
    }
  }

  async updatePassword(password:string){
    var user: any = await this.firebaseAuth.currentUser;
    var result:any = await this.api.get(environment.API_URL + "/user/search/"+ localStorage.getItem('user')).toPromise();
    this.object = result.data;
    this.userId = `${this.object[0].id}`;
    

    await this.api.patch(environment.API_URL + "/user/replacePatch/"+ this.userId, { 
        "password": password,
      }
      ).toPromise().then(async function(){
        await updatePassword(user, password);
       window.alert("Password updated successfully");
       location.reload();
      }).catch(()=>{
       window.alert("Password already used");
    })
  }

  async updateBalance(amount:number){
    var user: any = await this.firebaseAuth.currentUser;
    var result:any = await this.api.get(environment.API_URL + "/user/search/"+ localStorage.getItem('user')).toPromise();
    this.object = result.data;
    this.userId = `${this.object[0].id}`;
    if(amount <= 0){
      window.alert("Please enter a valid amount");
    }
    else{
      await this.api.patch(environment.API_URL + "/user/replacePatch/"+ this.userId, { 
        "balance": amount,
      }
      ).toPromise().then(async function(){
       window.alert("Balance updated successfully");
       location.reload();
      }).catch(()=>{
       window.alert("Balance not updated successfully");
    })

    }
  }


}
