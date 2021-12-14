import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  requestResult: any;
  intBalance: number | undefined;

  constructor(private router: Router, private api: HttpClient, public firebaseservice: FirebaseService) { }
  ngOnInit(): void {
    
  }

  async update(balance: string){
    this.intBalance = parseInt(balance);
    await this.firebaseservice.updateBalance(this.intBalance);
    this.nav('home');
  }


  nav(destination: string) {
    this.router.navigate([destination]);
  }  

}
