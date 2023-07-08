import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendMail(email:any, content:any, template:any){
    var templateParams = {      
      content: content,
      cc_address: email
  };
   
  emailjs.send('109056036756196149798', template, templateParams, '9Wcvg8jXAu_3qSUAk')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
  }
}
