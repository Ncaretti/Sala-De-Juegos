import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { ChatComponent } from './pages/chat/chat.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { PongComponent } from './pages/pong/pong.component';
import { ListadoResultadosComponent } from './pages/listado-resultados/listado-resultados.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { ListadoEncuestasComponent } from './pages/listado-encuestas/listado-encuestas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quien-soy', component:QuienSoyComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'chat', component: ChatComponent, 
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'ahorcado', component: AhorcadoComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'mayor-menor', component: MayorMenorComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'preguntados', component: PreguntadosComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'pong', component: PongComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'listado-resultados', component: ListadoResultadosComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'encuesta', component: EncuestaComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'listado-encuestas', component: ListadoEncuestasComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

