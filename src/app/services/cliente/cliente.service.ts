import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  totalClientes: number = 0;
  cliente: Cliente;
  id: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
  }

crearCliente(cliente: Cliente){
  let url = URL_SERVICIOS + 'cliente';

  return this.http.post(url, cliente).pipe(
    map((resp: any) =>{
      swal('Cliente creado correctamente', cliente.nombre, 'success');
      return resp.cliente;
  }));
}

actualizarCliente(cliente: Cliente){
  let url = URL_SERVICIOS + 'cliente/' + cliente._id;
  return this.http.put(url, cliente).pipe(
    map((resp: any) =>{
      let clienteDB: Cliente = resp.cliente;
      swal('Cliente actualizado correctamente', clienteDB.nombre, 'success');
      return true;
  }));
}

cambiarImagen(file: File, id: string){
  this._subirArchivoService.subirArchivo(file, 'clientes', id).then((resp: any)=>{
    this.cliente.img = resp.cliente.img;
  }).catch(resp=>{
  });
}

cargarClientes(desde: number = 0){
  let url = URL_SERVICIOS + 'cliente?desde=' + desde;
  return this.http.get(url);
}

cargarClienteID(id: String){
  let url = URL_SERVICIOS + 'cliente/' + id;
  return this.http.get(url).pipe(map((resp: any) => resp.cliente));
}

buscarClientes(termino: string){
  let url = URL_SERVICIOS + 'busqueda/coleccion/clientes/' + termino;
  return this.http.get(url).pipe(map((resp: any)=>{
    return resp.clientes;
  }));
}

borrarCliente(id: string){
  let url = URL_SERVICIOS + 'cliente/' + id;
  return this.http.delete(url);
}

}
