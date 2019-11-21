import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ClienteService } from './cliente/cliente.service';
import { FacturaService } from './factura/factura.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    ClienteService,
    FacturaService,
    LoginGuardGuard,
    SubirArchivoService
  ]
})
export class ServiceModule { }
