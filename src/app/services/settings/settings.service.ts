import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document,) { 
    this.cargarAjustes();
  }
guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

aplicarTema (color: any){
    let url = `assets/css/colors/${color}`;
    this._document.getElementById('tema1234').setAttribute('href', url + '.css');

    this.ajustes.tema = color;
    this.ajustes.temaURL = url ;

    this.guardarAjustes();
  }

}
interface Ajustes {
  temaURL: string;
  tema: string;
}
