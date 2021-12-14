import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { FirebaseService } from './screens/service/firebase.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BalanceComponent } from './screens/balance/balance.component';
import { RegisterComponent } from './screens/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './screens/admin/admin.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BalanceComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAKX7OVyfmkpbm8Qv1VATd12ZnvWLH09iU",
      authDomain: "apps-dev---rodriguez.firebaseapp.com",
      projectId: "apps-dev---rodriguez",
      storageBucket: "apps-dev---rodriguez.appspot.com",
      messagingSenderId: "552996862067",
      appId: "1:552996862067:web:32b11fb71784367c711206",
      measurementId: "G-SPYM1B45Y9"
      }
    )
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
