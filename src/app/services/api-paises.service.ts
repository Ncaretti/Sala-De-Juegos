import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPaisesService {

  constructor(private http: HttpClient) { }

  async obtenerPaises(){
    const api: any = await fetch('https://restcountries.com/v3.1/all?fields=name,translations,flags');
    const paises: any = await api.json();
    
    return paises;
  }
}
