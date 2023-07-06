import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BdServiceService } from 'src/app/services/bd-service.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent {
  numeroActual!:number;
  cartaMazo : boolean = false;
  numeroAnterior:number= Math.floor(Math.random() * 100);
  puntos: number = 0;
  pantallaPerdida: boolean = false;
  gif: string ='';

  constructor(private bd : BdServiceService, private auth: Auth){}

  ngOnInit(){
    this.numeroActual = 0;
    this.cartaMazo = false;
    this.numeroAnterior = Math.floor(Math.random() * 100);
    this.puntos = 0;
    this.pantallaPerdida = false;
    this.gif = '';
  }


  cambiarPosicion(btn: string){
    this.numeroActual = Math.floor(Math.random() * 100);
    this.cartaMazo = true;
    (document.getElementById('btnMayor') as HTMLInputElement).disabled = true;
    (document.getElementById('btnMenor') as HTMLInputElement).disabled = true;

    setTimeout(()=>{
      document.getElementById('cartaMazo')!.classList.add('moverDerecha'); //Con ento le agregás la clase al div. Entonces recién ahí empieza la animación.
      setTimeout(()=>{
        this.sumarPuntos(this.numeroActual, this.numeroAnterior, btn);
        this.cartaMazo = false;
        this.numeroAnterior = this.numeroActual;
        (document.getElementById('btnMayor') as HTMLInputElement).disabled = false;
        (document.getElementById('btnMenor') as HTMLInputElement).disabled = false;
      },1480);//Tiempo de lo que dura la animación (un poco menos porque si no se ve cómo vuelve a la posición anterior). Es la suma de "animation-duration" y "animation-delay" del CSS
    },100);
  } 

  sumarPuntos(numActual: number, numAnterior: number, btn : string){
    if(btn == 'mayor' && numActual >= numAnterior)
    {
      this.puntos += 1;
    }
    else if(btn == 'menor' && numActual <= numAnterior)
    {
      this.puntos += 1;
    }
    else
    {
      this.pantallaPerdida = true;
      this.gifPuntos();
    }
  }

  gifPuntos(){
    if(this.puntos <= 3)
    {
      this.gif= "../../../assets/35T4.gif";
    }
    else if(this.puntos >= 4 && this.puntos <= 6)
    {
      this.gif= "../../../assets/5SvC.gif";
    }
    else
    {
      this.gif= "../../../assets/xw.gif";
    }

    this.subirMayorMenorBD();
  }

  subirMayorMenorBD(){
    let datos = {
      uid: this.auth.currentUser?.uid,
      puntos: this.puntos,
      fecha: new Date().toLocaleString()
    }

    this.bd.uploadMayorMenor(datos);
  }
}

