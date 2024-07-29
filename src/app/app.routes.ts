import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TipoCambioBanxicoComponent } from './components/tipo-cambio-banxico/tipo-cambio-banxico.component';

export const routes: Routes = [
    {path : '', component:AppComponent}, //ruta principal
    {path: 'tipo-cambio-baxico', component:TipoCambioBanxicoComponent}
];
