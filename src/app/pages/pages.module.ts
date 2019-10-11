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


@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        IncrementadorComponent,
        DoughnutComponent,
        AccountSettingsComponent
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
        CommonModule
    ]
})

export class PagesModule { }