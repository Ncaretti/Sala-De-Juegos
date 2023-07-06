import { Component } from '@angular/core';
import { BdServiceService } from 'src/app/services/bd-service.service';

@Component({
  selector: 'app-listado-encuestas',
  templateUrl: './listado-encuestas.component.html',
  styleUrls: ['./listado-encuestas.component.css']
})
export class ListadoEncuestasComponent {

  arrayEncuestas: any [] = [];

  constructor(private bd: BdServiceService) {}

  ngOnInit()
  {
    this.bd.getEncuestas().subscribe(data => this.arrayEncuestas = data);
  }
}
