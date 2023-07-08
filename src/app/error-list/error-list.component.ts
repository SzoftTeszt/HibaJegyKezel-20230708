import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { HibaJegy } from '../hibajegy';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent {
  isOk=false;
  loggedUser:any=null;

  hibajegyek:any;
  oszlopok=[
      {key:"email", text:"Bejelentő", type:"plaintext"},
      {key:"content", text:"Hiba leírás", type:"plaintext"},
     {key:"piority", text:"Pioritás", type:"select", 
      values:[
        {value:0, text:"Alacsony"},
        {value:1, text:"Normál"},
        {value:2, text:"Magas"}
      ]}, 
     
      {key:"uid", text:"Felelős", type:"select", 
      values:[
        {value:0, text:"---"},
        {value:1, text:"jagerattila@gmail.com"},
        {value:2, text:"szoftteszt2020@gmail.com"}
      ]},
      {key:"status", text:"Állapot", type:"select", 
      values:[
        {value:0, text:"Felvéve"},
        {value:1, text:"Folyamatban"},
        {value:2, text:"Megoldva"}
      ]},
  ]

  constructor(private base: BaseService, private auth:AuthService){
    this.base.getHibaJegyek().snapshotChanges().pipe(
      map(
        ch=> ch.map(c=>({key:c.key, ...c.payload.val()})))
        ).subscribe(
        (a)=>this.hibajegyek=a
      )
      
      this.auth.getisLogged().subscribe(
        (u)=>{
          this.loggedUser=u;
          console.log("ClaimsErrorList:", this.loggedUser.claims)
          this.isOk=this.loggedUser.claims?.admin || this.loggedUser.claims?.author;
        }
      )


     

  }


  update(hibajegy:HibaJegy){
    this.base.updateHibaJegy(hibajegy)
  }
  delete(hibajegy:HibaJegy){
    this.base.deleteHibaJegy(hibajegy)
  }
}
