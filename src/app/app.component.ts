import { Component } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';
import { onAuthStateChanged } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';
import { BdServiceService } from './services/bd-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeJuegos';
  logueado = false;
  esAdmin = false;
  usr!:any;

  constructor(private auth : UserAuthService, private a : Auth, private router : Router, private bd : BdServiceService){
    onAuthStateChanged(a, (user)=>{
      if(user)
      {
        console.log(user.uid);
        this.logueado = true;
        setTimeout(()=>{
          this.bd.getUser('C6K5iyO1P6ROlBn1j7ghXaNiOTw1').subscribe(data => this.usr = data);
          setTimeout(()=>{
            console.log(this.usr);
            if(this.usr != undefined)
            {
              if(this.usr.uid == user.uid)
              {
                console.log(this.usr);
                this.esAdmin = true;
              }
            }
          }, 200)

        }, 500)
      }
    })
  }

  cerrarSesion(){
    this.a.signOut();
    onAuthStateChanged(this.a, (user)=>{
      if(user == null)
      {
        console.log("entro");
        this.logueado = false;
        this.router.navigate(['/login']);
        setTimeout(() => {
          this.router.navigate(['/home']);
          this.esAdmin = false;
        }, 0.5);

      }
    })
  }
}
