import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private auth: Auth){}

  register({email, pass}:any)
  {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  login(email : any, password : any)
  {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUserLogged(){
    return this.auth.currentUser;
  }
}
