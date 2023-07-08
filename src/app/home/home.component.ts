import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Enviroments } from '../enviroments';
import { HibaJegy } from '../hibajegy';
import { BaseService } from '../base.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:any=null;
  isSendMail=false;
  isSendError=false;
  constructor(private auth:AuthService, private router:Router,
    private actRoute: ActivatedRoute, private base:BaseService,
    private emailServ:EmailService){

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
    this.auth.sendSingInLink(email)
    this.isSendMail=true;
    this.isSendError=false;
  }

  hibaBejent(content:any){
    const body:HibaJegy={};
    body.content=content;
    body.email=this.user.email;
    body.status=0;
    body.piority=0;
    body.uid=0;

    this.base.addHibaJegy(body);
    this.emailServ.sendMail(this.user.email+";jagerattila@gmail.com",content,'template_60u3sb4')
    this.auth.SignOut();
    this.isSendMail=false;
    this.isSendError=true;
  }
}
