import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  loggedUser:any=null;
  collapse=true;
  constructor(private auth:AuthService){
    this.auth.getisLogged().subscribe(
      (u)=>{
        this.loggedUser=u;
        // console.log("Hírdetve:",this.loggedUser)
      }
    )
  }

  SignOut(){
    this.auth.SignOut();
  }
}
