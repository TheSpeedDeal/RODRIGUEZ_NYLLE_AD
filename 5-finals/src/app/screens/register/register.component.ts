import { Component, OnInit } from '@angular/core';
import { 
  FormControl, 
  FormGroup, 
  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http'; 
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  payload: any;
  
  
  constructor(private router: Router, private api: HttpClient, public firebaseservice: FirebaseService)  { }

  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl(0, Validators.min(1)),
    fcPassword2: new FormControl('', Validators.required),
  });

  error: string = '';

  ngOnInit(): void {
  }
  
  fCEmail = new FormControl();
  fCPassword = new FormControl();
  fCAge = new FormControl();
  fCName = new FormControl();
  requestResult = '';
  
  
  
 

  async register(email: string, password: string) {
    if(password === this.registerForm.value["fcPassword2"]){
      await this.firebaseservice.register(email, password);
      if(this.firebaseservice.loggedIn) {
        this.nav("home");
      }
      var result:any = await this.api.post(environment.API_URL+"/user/register", 
      {
        name: this.registerForm.value.fcName, 
        age:this.registerForm.value.fcAge,
        email:email,
        password: this.registerForm.value.fcPassword2,
        balance: 0
      }).toPromise();
 
       if(result.success){
      this.nav('home');
    }
    console.log(result.success);
    this.requestResult = result.data;
    }
    
  }
  
  

  nav(destination: string) {
    this.router.navigate([destination]);
  }  
}  