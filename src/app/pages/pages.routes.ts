import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturaComponent } from './facturas/factura.component';
import { ClienteComponent } from './clientes/cliente.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FaqComponent } from './faq/faq.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'DashBoard' } },
        //   { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
        //   { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }},
        //   { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
        //   { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }},
          { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }},
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }},
          { path: 'clientes', component: ClientesComponent, data: { titulo: 'Mantenimiento de Clientes' }},
          { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Página de Cliente' }},
          { path: 'facturas', component: FacturasComponent, data: { titulo: 'Mantenimiento de Facturas' }},
          { path: 'factura/:id', component: FacturaComponent, data: { titulo: 'Página de Factura' }},
          { path: 'faq', component: FaqComponent, data: { titulo: 'Página de Preguntas y Comentarios' }},
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' }]
      },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);



