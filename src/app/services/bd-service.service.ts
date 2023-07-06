import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDoc, orderBy, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdServiceService {

  constructor(private bd : Firestore) { }

  getAhorcado(): Observable<any[]>{
    const ref = collection(this.bd, 'ahorcado');
    const q = query(ref, orderBy('errores', 'asc'));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  uploadAhorcado(datos: any)
  {
    const ref = collection(this.bd, 'ahorcado');
    return addDoc(ref, datos);
  }

  getMayorMenor(): Observable<any[]>{
    const ref = collection(this.bd, 'mayorMenor');
    const q = query(ref, orderBy('puntos', 'desc'));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  uploadMayorMenor(datos: any)
  {
    const ref = collection(this.bd, 'mayorMenor');
    return addDoc(ref, datos);
  }

  getPreguntados(): Observable<any[]>{
    const ref = collection(this.bd, 'preguntados');
    const q = query(ref, orderBy('puntos', 'desc'));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  uploadPreguntados(datos: any)
  {
    const ref = collection(this.bd, 'preguntados');
    return addDoc(ref, datos);
  }

  getEncuestas(): Observable<any[]>{
    const ref = collection(this.bd, 'encuestas');
    const q = query(ref, orderBy('edad', 'desc'));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  uploadEncuestas(datos: any)
  {
    const ref = collection(this.bd, 'encuestas');
    return addDoc(ref, datos);
  }

  getUsuario(uid: string) { 
    const docRef = doc(this.bd, "usuarios", uid);
    return getDoc(docRef);
  }

  getUser(uid:string) {
    const noteDocRef = doc(this.bd, `usuarios/${uid}`);
    return docData(noteDocRef, {idField: 'id'}) as Observable<any>;
  }
}
