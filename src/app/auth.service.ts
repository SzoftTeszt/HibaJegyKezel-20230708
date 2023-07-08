import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiUrl="https://us-central1-hibajegykezelo-abbcf.cloudfunctions.net/api/"
   isLogged = new Subject()
   loggedUser:any;

   actionCodeSettings = {
     // URL you want to redirect back to. The domain (www.example.com) for this
     // URL must be in the authorized domains list in the Firebase Console.
     url: 'http://localhost:4200/home',
     // This must be true.
     handleCodeInApp: true,   
   };
   // [END auth_email_link_actioncode_settings]
 
   constructor(private http: HttpClient, private afAuth:AngularFireAuth) {
     this.getisLogged().subscribe();
    }
 
   getisLogged(){
     this.afAuth.onAuthStateChanged((user)=>{
     // this.afAuth.onAuthStateChanged.authState.subscribe((user)=>{
       if (user){
        console.log("Bejelnkezés", user)
         this.loggedUser=user;
         this.loggedUser.getIdToken().then((t:any)=>        
         {
           this.loggedUser.token=t;
          //  this.getClaims(this.loggedUser.uid).subscribe(
          //    (claims)=> this.loggedUser.claims=claims
          //  )
         })
        
         // console.log('User'+user);
       
       }
       else {
         this.loggedUser=null;
       }
       this.isLogged.next(this.loggedUser)
     })
     return this.isLogged
   }
 
   SingUp(email:string, password:string){
     return this.afAuth.createUserWithEmailAndPassword(email, password)
   }
   SingIn(email:string, password:string){
     return this.afAuth.signInWithEmailAndPassword(email, password)
   }
 
     // [START auth_email_link_actioncode_settings]
     
   
   sendSingInLink(email:string){  
    window.localStorage.setItem('email',email)
     return this.afAuth.sendSignInLinkToEmail(email,this.actionCodeSettings)
   
   }
   signInLink(){
    var email = window.localStorage.getItem('email')
    if (email){
      this.afAuth.signInWithEmailLink(email).then(eredmeny=>
        {
          console.log("Sikeres bejelntkezés", eredmeny)
          window.localStorage.removeItem('email')
        }).catch((e)=>console.log("Hiba a bejelentkezéskor",e))
    }
   }

   SignOut(){
     return this.afAuth.signOut();
   }
 
   GoogleAuth(){
     return this.afAuth.signInWithRedirect(new GoogleAuthProvider())
   }
 
  //  getClaims(uid:string){
  //    const headers = new HttpHeaders().set('Authorization', this.loggedUser.token);
  //    const url=this.apiUrl+"users/"+uid+"/claims";
  //    return this.http.get(url, {headers})
  //  }
 
  //  getUsers(){
  //    console.log("Bejelemtkezve", this.loggedUser)
  //    const headers = new HttpHeaders().set('Authorization', this.loggedUser.token);
  //    const url=this.apiUrl+"users";
  //    return this.http.get(url, {headers})
  //  }
 
  //  setClaims(uid:string, claims:string){
  //    const headers = new HttpHeaders().set('Authorization', this.loggedUser.token);
  //    const url=this.apiUrl+"setCustomClaims";
  //    const body={uid, claims}
  //    console.log("setClaimsBody", body)
  //    this.http.post(url, body, {headers}).subscribe()
  //  }
 }
