import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BdServiceService } from 'src/app/services/bd-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  formEncuesta!: FormGroup;

  constructor(private fb : FormBuilder, private bd: BdServiceService, private router : Router, private auth : Auth){
    this.formEncuesta = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.min(10000), Validators.max(9999999999)]],
      puntaje: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      eleccion: ['truco', [Validators.required]],
      recomendacion: ['', [Validators.required]]
    })
  }

  subirEncuestaBD(){
    if(this.formEncuesta.valid)
    {
      let datos = {
        nombre: this.formEncuesta.value.nombre,
        apellido: this.formEncuesta.value.apellido,
        edad: this.formEncuesta.value.edad,
        telefono: this.formEncuesta.value.telefono,
        calificacion: this.formEncuesta.value.puntaje,
        recomendacion: this.formEncuesta.value.recomendacion,
        juegoQueDesea: this.formEncuesta.value.eleccion,
        correoUser: this.auth.currentUser?.email
      }

      this.bd.uploadEncuestas(datos)
      .then(()=>{
        this.alertas('Encuesta subida con exito', 'success', 'Ok');
        this.router.navigate(['home']);

      });
    }
  }

  alertas(titulo: any, icono: any, textoBoton:any)
  {
    if(titulo != null)
    {
      Swal.fire({
        title: titulo,
        icon: icono,
        confirmButtonText: textoBoton
      })
    }
  }
}
