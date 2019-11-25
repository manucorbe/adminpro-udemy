import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url:'/usuarios' },
        {titulo: 'Clientes', url:'/clientes' },
        {titulo: 'Facturas', url:'/facturas' },
      ]
    }
  ];
  
  constructor() { }
}
