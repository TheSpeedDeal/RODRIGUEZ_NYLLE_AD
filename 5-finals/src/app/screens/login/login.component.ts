import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public firebaseservice: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') != null){
      this.nav('home');
    }
  }


  async login(email: string, password: string){
    await this.firebaseservice.login(email, password);
    if(this.firebaseservice.loggedIn){
      this.nav('home');
    }
  } 

  

  nav(destination: string) {
    this.router.navigate([destination]);
  }  

}