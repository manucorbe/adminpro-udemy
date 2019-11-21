import { Injectable } from '@angular/core';
import { Factura } from '../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  totalFacturas: number = 0;
  factura: Factura;
  id: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
  }

crearFactura(factura: Factura){
  let url = URL_SERVICIOS + 'factura';

  return this.http.post(url, factura).pipe(
    map((resp: any) =>{
      swal('Factura creada correctamente', factura.nombre, 'success');
      return resp.factura;
  }));
}

actualizarFactura(factura: Factura){
  let url = URL_SERVICIOS + 'factura/' + factura._id;
  return this.http.put(url, factura).pipe(
    map((resp: any) =>{
      let facturaDB: Factura = resp.factura;
      swal('Información actualizada correctamente', facturaDB.nombre, 'success');
      return true;
  }));
}

cambiarImagen(file: File, id: string){
  this._subirArchivoService.subirArchivo(file, 'facturas', id).then((resp: any) => {
    this.factura.img = resp.factura.img;
  }).catch(resp => {
  });
}

cargarFacturas(desde: number = 0){
  let url = URL_SERVICIOS + 'factura?desde=' + desde;
  return this.http.get(url);
}

cargarFacturaID(id: String){
  let url = URL_SERVICIOS + 'factura/' + id;
  return this.http.get(url).pipe(map((resp: any) => resp.factura));
}

buscarFacturas(termino: string){
  let url = URL_SERVICIOS + 'busqueda/coleccion/facturas/' + termino;
  return this.http.get(url).pipe(map((resp: any)=>{
    return resp.facturas;
  }));
}

borrarFactura(id: string){
  let url = URL_SERVICIOS + 'factura/' + id;
  return this.http.delete(url);
}

}
