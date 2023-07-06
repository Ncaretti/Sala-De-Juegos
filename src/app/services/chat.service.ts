import { Injectable } from '@angular/core';
import { Firestore, Timestamp, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Mensajes{
  id?:string,
  mensaje:string,
  correo:string,
  fechaOrden:Date & Timestamp,
  fecha:string 
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private fire: Firestore) { }

  getMensajes():Observable<Mensajes[]>{
    const msjRef = query(collection(this.fire, 'mensajes'), orderBy("fechaOrden", 'asc'));
    return collectionData(msjRef, {idField: 'id'}) as Observable<Mensajes[]>;
  }
}
