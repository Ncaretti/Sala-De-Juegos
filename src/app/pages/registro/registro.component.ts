import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formRegistro!:FormGroup;
  @Output() seLogueo = new EventEmitter<any>();

  constructor(private userAuth: UserAuthService, private fb: FormBuilder, private router : Router)
  {
    this.formRegistro = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      repPass: ['',[Validators.required]]
    })
  }

  registrar()
  {
    let titulo : any;
    let icono : any;
    let texto : any;
    let textoBoton : any;

    this.userAuth.register(this.formRegistro.value)
    .then(()=>{
      this.userAuth.login(this.formRegistro.controls.email.value, this.formRegistro.controls.pass.value)
      .then(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso.',
          showConfirmButton: false,
          timer: 1500
        })
        this.seLogueo.emit(true);
        this.router.navigate(['/home']);
      })
    })
    .catch((error) =>{
      console.log(error.code);

      switch(error.code)
      {
        case 'auth/invalid-email':
          titulo = 'Error';
          icono = 'error';
          texto = 'El correo ingresado es invalido.';
          textoBoton = 'Ok';
        break;

        case 'auth/email-already-in-use':
          titulo = 'Error';
          icono = 'error';
          texto = 'El correo ya esta registrado.';
          textoBoton = 'Ok';
        break;

        case 'auth/weak-password':
          titulo = 'Error';
          icono = 'error';
          texto = 'La contraseña debe tener minimo 6 caracteres.';
          textoBoton = 'Ok';
        break;
      }

      this.alertas(titulo, texto, icono, textoBoton);
    })
  }

  alertas(titulo: any, texto: any, icono: any, textoBoton:any)
  {
    if(titulo != null)
    {
      Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: textoBoton
      })
    }
  }
}
