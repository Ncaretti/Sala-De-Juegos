import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!:string;
  pass!:string;
  formLogin!: FormGroup;

  constructor(private router : Router, private userAuth : UserAuthService, private fb : FormBuilder)
  {
    // this.formLogin = this.fb.group({
    //   'email': ['', [Validators.required, Validators.email]],
    //   'pass': ['', [Validators.required, Validators.min(6)]]
    // })
  }

  login(){
    this.userAuth.login(this.email, this.pass)
    .then(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso.',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/home']);
    })
    .catch((error) =>{
      let titulo : any;
      let icono : any;
      let texto : any;
      let textoBoton : any;
      switch(error.code)
      {
        case 'auth/invalid-email':
          titulo = 'Error';
          icono = 'error';
          texto = 'El correo ingresado es invalido.';
          textoBoton = 'Ok';
        break;
        
        default:
          titulo = 'Error';
          icono = 'error';
          texto = 'Usuario y/o contraseña erroneo/s.';
          textoBoton = 'Ok';
        break;
      }

      this.alertas(titulo, texto, icono, textoBoton);
    })
  }

  autoCarga()
  {
    this.email = 'asd@asd.com';
    this.pass = '123456';
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
