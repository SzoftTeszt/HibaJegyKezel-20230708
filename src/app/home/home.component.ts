import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Enviroments } from '../enviroments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:any=null;
  constructor(private auth:AuthService, private router:Router,
    private actRoute: ActivatedRoute){

      this.actRoute.queryParams.subscribe(
        (params)=>{
          var apiKey= params['apiKey']
          var email = window.localStorage.getItem("email")
          if( email && (apiKey==Enviroments.firebaseConfig.apiKey))
          {
            console.log("email", email)
            console.log("apiKey", apiKey)
            this.auth.signInLink();
          }
        }
      )

      this.auth.getisLogged().subscribe((u)=>{this.user=u;
        console.log("Home_Bejelnkezés", this.user)})
  }

  sendUpLink(email:any){
    this.auth.sendSingInLink(email).then(
      ()=>{})
      .catch((e)=>console.log(e))
  }
  hibaBejent(){
    this.auth.SignOut();
  }
}
