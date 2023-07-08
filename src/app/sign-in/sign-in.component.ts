import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private auth:AuthService, private router:Router){

  }
  signIn(email:any, password:any){
    this.auth.SingIn(email, password).then(()=>this.router.navigate(['/hibaLista']))
  }
}
