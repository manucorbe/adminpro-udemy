import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutComponent } from '../components/doughnut/doughnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommonModule } from '@angular/common';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ClienteComponent } from './clientes/cliente.component';
import { FacturaComponent } from './facturas/factura.component';
import { FaqComponent } from './faq/faq.component';
import { RouterModule, Routes } from '@angular/router';



@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        IncrementadorComponent,
        DoughnutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ClientesComponent,
        FacturasComponent,
        FacturaComponent,
        ClienteComponent,
        FaqComponent,
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule
    ]
})

export class PagesModule { }
