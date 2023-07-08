import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HibaJegy } from './hibajegy';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private refHibaJegy: AngularFireList<HibaJegy>
  constructor(private db:AngularFireDatabase) { 
    this.refHibaJegy=this.db.list('hibajegyek')
  }

  addHibaJegy(body:any){
    return this.refHibaJegy.push(body)
  }
  getHibaJegyek(){
    return this.refHibaJegy;
  }
  updateHibaJegy(body:any){
    return this.refHibaJegy.update(body.key,body);
  }
  deleteHibaJegy(body:any){
    return this.refHibaJegy.remove(body.key);
  }
}
