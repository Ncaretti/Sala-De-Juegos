import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BdServiceService } from 'src/app/services/bd-service.service';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.css']
})
export class ListadoResultadosComponent {

  arrayAuxAhorcado: any[]= [];
  arrayAhorcado: any[] = [];

  arrayAuxMayorMenor: any[]= [];
  arrayMayorMenor: any[] = [];

  arrayAuxPreguntados: any[]= [];
  arrayPreguntados: any[] = [];

  constructor(private bd : BdServiceService, private auth : Auth){}

  ngOnInit(){
    this.bd.getAhorcado().subscribe(data => this.arrayAuxAhorcado = data);
    this.bd.getMayorMenor().subscribe(data => this.arrayAuxMayorMenor = data);
    this.bd.getPreguntados().subscribe(data => this.arrayAuxPreguntados = data);

    setTimeout(()=>{
      this.arrayAuxAhorcado.forEach((aux)=>{
        if(aux.uid == this.auth.currentUser?.uid && !this.arrayAhorcado.includes(aux))
        {
          this.arrayAhorcado.push(aux);
        }
      });

      this.arrayAuxMayorMenor.forEach((aux)=>{
        if(aux.uid == this.auth.currentUser?.uid && !this.arrayMayorMenor.includes(aux))
        {
          this.arrayMayorMenor.push(aux);
        }
      });

      this.arrayAuxPreguntados.forEach((aux)=>{
        if(aux.uid == this.auth.currentUser?.uid && !this.arrayPreguntados.includes(aux))
        {
          this.arrayPreguntados.push(aux);
        }
      });

    }, 800)

  }
}
