import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { RecursoFormularioComponent } from './components/recurso-formulario/recurso-formulario'; 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'publicar', component: RecursoFormularioComponent }, 
];