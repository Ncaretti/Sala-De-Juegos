import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pantalla!: string;

  constructor(private userActual : UserAuthService){}

  ngOnInit(){
    if(this.userActual.getUserLogged() != null){
      this.pantalla = 'logueado';
    }
    else
    {
      this.pantalla = 'sinUser'
    }
  }
}
