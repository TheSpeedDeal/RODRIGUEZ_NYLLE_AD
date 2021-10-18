import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal';
  userCredential1 = "null";
  userCredential2 = "null";
    login(email: string, password: string){
      this.userCredential1 = email;
      this.userCredential2 = password;
    }
}


