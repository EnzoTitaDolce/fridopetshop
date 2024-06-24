import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { SaludComponent } from './salud/salud.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'alimentos', component:AlimentosComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'salud', component: SaludComponent },
  //{ path: 'contactos', component: ContactosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirecciona a Home por defecto
  { path: '**', redirectTo: '/home' }  // Redirecciona a Home si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
