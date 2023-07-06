import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BdServiceService } from 'src/app/services/bd-service.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  letras : string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  palabras : string[] = ['ganso', 'ñandu', 'elefante', 'gato', 'colibri', 'delfin', 'yacare',
  'ballena', 'cocodrilo', 'liebre', 'hiena', 'hipopotamo'];

  palabraAleatoria! : any;
  palabraOculta!: any;
  intentos : number = 0;
  ganaste : number = 0;

  constructor(private router : Router, private bd : BdServiceService, private auth : Auth){

  }

  ngOnInit()
  {
    this.ganaste = 0;
    this.intentos = 0;
    let index = Math.round(Math.random() * (this.palabras.length - 1));
    this.palabraAleatoria = this.palabras[index];
    this.palabraOculta = "_ ".repeat(this.palabraAleatoria.length);
    console.log(this.palabraAleatoria);
    console.log(this.palabraOculta);
  }

  comprobarLetra(letra : any, j : number){
    if(this.palabraAleatoria.indexOf(letra) >=0)
    {
      const separarPalabra = this.palabraOculta.split(" ");
      console.log(separarPalabra);
      for(let i = 0; i <= this.palabraAleatoria.length; i++)
      {
        if(this.palabraAleatoria[i] == letra)
        {
          separarPalabra[i] = letra;
          // document.getElementsByTagName('button')[(j + 2)]!.style.backgroundColor = "#008000";
          document.getElementsByTagName('button')[(j + 2)]!.disabled = true;
          document.getElementsByTagName('button')[(j + 2)]!.className = "btn letras btn-success";
        }
        this.palabraOculta = separarPalabra.join(" ");
      }
    }
    else
    {
      console.log("no esta");
      console.log(document.getElementsByTagName('button')[(j + 2)]);

      // document.getElementsByTagName('button')[(j + 2)]!.style.backgroundColor = "#FF0000";
      document.getElementsByTagName('button')[(j + 2)]!.className = "btn letras btn-danger";
      document.getElementsByTagName('button')[(j + 2)]!.disabled = true;
      this.intentos += 1;
    }

    this.verificaGanador();
  }

  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");

    if (palabraEvaluar === this.palabraAleatoria) {
      this.ganaste = 1;
      this.subirAhorcadoBD('si');
    }
    if (this.intentos == 6) {
      this.ganaste = -1;
      this.subirAhorcadoBD('no');
    }
  }

  subirAhorcadoBD(ganaste: string){
    let datos = {
      victoria: ganaste,
      uid: this.auth.currentUser?.uid,
      errores: this.intentos,
      fecha: new Date().toLocaleString()
    }

    this.bd.uploadAhorcado(datos);
  }

  volverAJugar()
  {
    this.ngOnInit();
  }

}
