import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  api: any;
  requestResult: any;
  constructor(private router: Router) { }

  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl(0, Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  error: string = '';

  ngOnInit(): void { }

  onSubmit() {
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.error = 'Password doesnt match!';
      return;
    }
    if (!this.registerForm.valid) {
      {
        this.error = 'No fields must be empty';
        return;
      }
    }
    if (this.registerForm.valid) {
      var payload: { name: string, email: string, age: number, password: string };
      payload = { name: this.registerForm.value.fcName, age: this.registerForm.value.fcAge, email: this.registerForm.value.fcemail, password: this.registerForm.value.fcPassword };
      console.log(payload);
      this.nav('home')
    }
  }

  async register() {
    var result = await this.api.post(environment.API_URL+"user/register",
    {"name": this.registerForm.value.fcname,
     "age": this.registerForm.value.fcage,
     "email": this.registerForm.value.fcemail,
     "password": this.registerForm.value.fcpassword,
    });

    if(result.success) this.nav('home');
    console.log(result.success);
    this.requestResult = result.data;
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
