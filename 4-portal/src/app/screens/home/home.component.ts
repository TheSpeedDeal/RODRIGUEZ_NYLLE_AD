import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  requestResult: any;
  api: any;

  constructor() { }

  ngOnInit(): void {
  }

  async display() {
    var result:any =await this.api.get(environment.API_URL + "/user/all").toPromise();
    this.requestResult = result.data
    console.log(result.success);
}

}
