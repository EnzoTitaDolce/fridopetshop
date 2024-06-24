import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { SaludComponent } from './salud/salud.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { NavComponent } from './nav/nav.component';
import { AlimentosService } from './servicios/alimentos';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlimentosComponent,
    AccesoriosComponent,
    SaludComponent,
    ContactoComponent,
    EncabezadoComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AlimentosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
