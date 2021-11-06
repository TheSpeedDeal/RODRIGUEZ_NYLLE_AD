import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http'; 
import { User } from './home.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: Array<User> = [];
  requestResult: any;
  show: Boolean = true;
  editdaid: Boolean = false;
  constructor(private router: Router, private api: HttpClient) { }


  editForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl(0, Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });


  fcId = new FormControl();
  ngOnInit(): void {
    this.display();
  }

  async display(): Promise<Array<User>>{
    var result:any =await this.api.get(environment.API_URL + "/user/all").toPromise();
    var temp: Array<User> = [];
    if (result.success) {
      result.data.forEach((json: any) => {
        var tempU = User.fromJson(json.id, json);
        if (tempU != null) temp.push(tempU);
        this.show = true;
        this.editdaid = false;
        this.requestResult = result.data
        console.log(result.success);
        });
      }
      return temp;
    }
  
  async getId(){
    if(this.fcId.value != null){
      if(this.fcId.value.length >= 27){
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
    else{
      alert('No ID input');
    }
  }
    
  async deleteId(){
    if(this.fcId.value != null){
      var c = confirm("Are you sure?");
     if(c){
      if(this.fcId.value.length >= 27){
        var result:any = await this.api.delete(environment.API_URL + "/user/"+ this.fcId.value).toPromise();
        this.requestResult = result.data
        this.display();
        console.log(result.success);
      }
      else{
        alert('Incorrect Input');
      }
     }
    }
    else{
      alert('No ID input');
    }
  }

  async reset(){
    var c = confirm('Are you sure you want to reset?');

    if(c){
      var reset = await this.api.patch(environment.API_URL+"/user/reset/").toPromise();
      this.display();
    }
  }

  async editBtn(){
    if(this.fcId.value != null){
      this.show = false;
      this.editdaid = true;
    }
    else{
      alert('No ID input');
    }
  }


  nav(destination: string) {
    this.router.navigate([destination]);
  }  

  onSubmit() {
    if (
      this.editForm.value['fcPassword'] !==
      this.editForm.value['fcPassword2']
    ) {
      alert('Password doesnt match!');
      return;
    }
    if (!this.editForm.valid) {
      {
        alert('No fields must be empty');
        return;
      }
    }
    if (this.editForm.valid) {
      
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };
      
      payload = {
        name: this.editForm.value.fcName,
        age: this.editForm.value.fcAge,
        email: this.editForm.value.fcEmail,
        password: this.editForm.value.fcPassword,
      };
    
      console.log(payload);
  
    }
  }

  async editId(){
    var result:any = await this.api.patch(environment.API_URL+"/user/"+ this.fcId.value, //change
    {
     "name": this.editForm.value.fcName, 
     "age":this.editForm.value.fcAge,
     "email":this.editForm.value.fcEmail,
     "password":this.editForm.value.fcPassword
     }).toPromise();
 
    if(result.success){
      this.editdaid = false;
      alert('Successfully updated');
      this.display();
    }
    console.log(result.success);
    this.requestResult = result.data;
  }
}

