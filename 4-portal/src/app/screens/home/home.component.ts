import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  requestResult: any;
  show: Boolean = true;
  constructor(private router: Router, private api: HttpClient) { }

  fcId = new FormControl();
  ngOnInit(): void {
    this.display();
  }

  async display() {
    var result:any =await this.api.get(environment.API_URL + "/user/all").toPromise();
    this.show = true;
    this.requestResult = result.data
    console.log(result.success);
  }

  async getId(){
    if(this.fcId.value.length >=36){
      try {
        var result:any = await this.api.get(environment.API_URL + "/user/"+ this.fcId.value).toPromise();
        
        if(result.success){
          this.show = false;
          this.requestResult.id = this.fcId.value
          this.requestResult.name = result.data.name
          this.requestResult.age = result.data.age
          this.requestResult.email= result.data.email
        }
        else{
          this.show = true;
          alert("Error");
        }
        console.log(result.success);
        console.log(this.fcId);
      } catch (error) {
        alert('Searched not in Database');
      }
    }
    else{
      try {
        var result:any = await this.api.get(environment.API_URL + "/user/search/"+ this.fcId.value).toPromise();
          this.requestResult = result.data
          console.log(result.success);
      } catch (error) {
        alert('Searched not in Database');
      }

    }
  }
    
  async deleteId(){
   if(this.fcId.value.length >= 36){
      var result:any =await this.api.delete(environment.API_URL + "/user/"+ this.fcId.value).toPromise();
      this.requestResult = result.data
      this.display();
      console.log(result.success);
    }
    else{
      alert('Incorrect ID');
    }
  }




  nav(destination: string) {
    this.router.navigate([destination]);
  }  

}
