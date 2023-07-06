import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { ChatService, Mensajes } from 'src/app/services/chat.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  nuevoMensaje!:string;
  userActual!:any;
  mensajes : Mensajes[] = [];

  //utilizar el uid para registrar tambien un nick en la base de datos que matchee con el uid del auth.
  //mostrar ese nick encima del mensaje tipo wpp.
  constructor(private a : Auth, private chat : ChatService,private bd : Firestore){
    onAuthStateChanged(a, (user)=>{
      if(user)
      {
        this.userActual = user;
        console.log(this.userActual.email);
        this.chat.getMensajes().subscribe(mensajes => this.mensajes = mensajes);
      }
    })
    setTimeout(()=>{
      this.scrollToTheLastElementByClassName();
    }, 1000);
  }

  ngOnInit()
  {
    //  setTimeout(()=>{
    //   const auth = getAuth();
    //   this.userActual = auth.currentUser;
    //   if(this.userActual)
    //   {
    //     console.log(this.userActual.correo);
    //   }
    //   // console.log(this.userActual);
    // },550)

    // for(let i = 0; i > this.mensajes.length; i++)
    // {
    //   console.log(this.mensajes[i].correo);
    // }
    setTimeout(()=>{
      this.scrollToTheLastElementByClassName();
    }, 20);
  }

  async enviarMensaje(){
    this.subirMensaje();
    // await setTimeout(()=>{
    //   const auth = getAuth();
    //   this.userActual = auth.currentUser;
    //   console.log(this.userActual);
    //   this.subirMensaje();
    // },250)

  }

  subirMensaje(){
    const fecha = new Date();
    addDoc(collection(this.bd, "mensajes"),{
      mensaje: this.nuevoMensaje,
      correo: this.userActual.email,
      fechaOrden: fecha,
      fecha: fecha
    })
    this.nuevoMensaje = "";

    setTimeout(()=>{
      this.scrollToTheLastElementByClassName();
    }, 20);
  }

  scrollToTheLastElementByClassName() {
    const elements = document.getElementsByClassName('ultimoMensaje');
    const lastElement: any = elements[(elements.length - 1)];
    const toppos = lastElement.offsetTop;

    document.getElementById('contMsj')!.scrollTop = toppos;
  } // end of scrollToTheLastElementByClassName

}
