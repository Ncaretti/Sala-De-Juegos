import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ApiPaisesService } from 'src/app/services/api-paises.service';
import { BdServiceService } from 'src/app/services/bd-service.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  arrayPaises : any[] = [];
  arrayPreguntas : any[] = [];
  auxPaisesActuales : any[] = [];
  indice:number = 0;
  vidas: number = 5;
  puntos: number = 0;
  pantalla: string = 'juego';

  constructor(private paisesService : ApiPaisesService, private bd : BdServiceService, private auth : Auth){}

  async ngOnInit(){
    this.arrayPaises= [];
    this.arrayPreguntas= [];
    this.auxPaisesActuales= [];
    this.indice = 0;
    this.vidas= 5;
    this.puntos= 0;
    this.pantalla= 'juego';
    const paises = await this.paisesService.obtenerPaises();
    this.arrayPaises = paises.map((pais: any)=>({nombre: pais.translations.spa.common, bandera: pais.flags.png}));
    this.generarPreguntas();
  }

  generarPaisAleatorio(respuesta : string){
    let idPaisAleatorio : number = Math.floor(Math.random() * this.arrayPaises.length);

    if(respuesta != this.arrayPaises[idPaisAleatorio].nombre && !this.auxPaisesActuales.includes(this.arrayPaises[idPaisAleatorio].nombre))
    {
      this.auxPaisesActuales.push(this.arrayPaises[idPaisAleatorio].nombre)
      return this.arrayPaises[idPaisAleatorio].nombre;
    }
    else
    {
      this.auxPaisesActuales.push(this.arrayPaises[idPaisAleatorio+1].nombre)
      return this.arrayPaises[idPaisAleatorio+1].nombre;
    }
  }

  generarPreguntas(){
    let arrayOpciones: any = [];
    this.arrayPaises.sort(()=> Math.random() - 0.5);

    this.arrayPreguntas = this.arrayPaises.slice(0, 10).map((pais : any)=>{
      arrayOpciones = [pais.nombre, this.generarPaisAleatorio(pais.nombre), this.generarPaisAleatorio(pais.nombre),
      this.generarPaisAleatorio(pais.nombre)];
      arrayOpciones.sort(()=> Math.random() - 0.5);

      this.auxPaisesActuales = [];
      return {respuesta: pais.nombre, bandera: pais.bandera, opciones: arrayOpciones}
    });

    console.log(this.arrayPreguntas);
  }

  opcionSeleccionada(opcion : string){
    if(opcion != this.arrayPreguntas[this.indice].respuesta)
    {
      (document.getElementById(opcion) as HTMLButtonElement).className = 'fallo col-md-5 btn';
      (document.getElementById(this.arrayPreguntas[this.indice].respuesta) as HTMLButtonElement).className = 'acerto col-md-5 btn';
      (document.getElementById('vidas') as HTMLDivElement).className = 'restar-vida';
      this.vidas--;
    }
    else
    {
      (document.getElementById(opcion) as HTMLButtonElement).className = 'acerto col-md-5 btn';
      (document.getElementById('puntos') as HTMLDivElement).className = 'sumar-puntos';
      this.puntos++;
    }

    setTimeout(()=>{
      (document.getElementById(opcion) as HTMLButtonElement).className = 'estilo-boton col-md-5 btn';
      (document.getElementById(this.arrayPreguntas[this.indice].respuesta) as HTMLButtonElement).className = 'estilo-boton col-md-5 btn';
      (document.getElementById('vidas') as HTMLDivElement).className = 'contenedor-vidas';
      (document.getElementById('puntos') as HTMLDivElement).className = 'contenedor-puntos';
      
      if(this.vidas == 0)
      {
        this.pantalla = 'perdiste';
        console.log("entro");
        this.subirPreguntadosBD();
      }

      console.log(this.indice);
      if(this.indice < 9){
        this.indice++;
      }
      else
      {
        this.pantalla = 'termino';
        this.subirPreguntadosBD();
      }
    }, 1400);
  }

  subirPreguntadosBD(){
    let datos = {
      puntos: this.puntos,
      uid: this.auth.currentUser?.uid,
      vidasRestantes: this.vidas,
      fecha: new Date().toLocaleString()
    }

    this.bd.uploadPreguntados(datos);
  }
}
