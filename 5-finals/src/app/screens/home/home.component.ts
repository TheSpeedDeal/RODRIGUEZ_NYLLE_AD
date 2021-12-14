import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  requestResult: any;

  constructor(private router: Router, private api: HttpClient, public firebaseservice: FirebaseService) { }
  ngOnInit(): void {
    if(localStorage.getItem('user') == null) {
      this.nav('login');
    }
    var helper = localStorage.getItem('user');
    this.requestResult = helper;
  }

  async logout(){
    this.firebaseservice.logout();
    this.nav('login');
  }

  async update(email: string, password: string){
    if(email === "") this.firebaseservice.updatePassword(password);
    else this.firebaseservice.updateUser(email);
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }  

}
