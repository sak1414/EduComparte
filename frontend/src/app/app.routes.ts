import { Routes } from '@angular/router';

// Componentes de autenticación (carpeta 'componentes')
import { Login } from './componentes/login/login';
import { Registro } from './componentes/registro/registro';
import { Inicio } from './componentes/inicio/inicio';
import { authGuard } from './servicios/auth-guard';

// Componentes de recursos (carpeta 'components')
import { ExplorarRecursos } from './components/explorar-recursos/explorar-recursos';
import { DetalleRecursoComponent } from './components/detalle-recurso/detalle-recurso';
import { RecursoFormularioComponent } from './components/recurso-formulario/recurso-formulario';
import { Home } from './components/home/home';

export const routes: Routes = [
  // Ruta por defecto: al abrir la app, va al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas publicas de autenticacion
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  // Rutas publicas: cualquiera puede ver recursos
  { path: 'home', component: Home },
  { path: 'explorar', component: ExplorarRecursos },
  { path: 'detalle/:id', component: DetalleRecursoComponent },

  // Rutas protegidas: requieren iniciar sesion
  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'publicar', component: RecursoFormularioComponent, canActivate: [authGuard] },
  { path: 'editar/:id', component: RecursoFormularioComponent, canActivate: [authGuard] },

  // Cualquier ruta no definida va al login
  { path: '**', redirectTo: '/login' }
];