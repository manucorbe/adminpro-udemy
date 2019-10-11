import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS
import { APP_ROUTES } from './app-routing.module';

//MODULES
import { PagesModule  } from './pages/pages.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//TEMPORAL
import { FormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
