import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { RecursoFormularioComponent } from './components/recurso-formulario/recurso-formulario';
import { ExplorarRecursos } from './components/explorar-recursos/explorar-recursos'; // <-- Importar

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'publicar', component: RecursoFormularioComponent },
  { path: 'explorar', component: ExplorarRecursos }, // <-- Nueva ruta
];