
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recurso } from '../../interfaces/recurso';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-explorar-recursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './explorar-recursos.html',
  styleUrl: './explorar-recursos.css'
})
export class ExplorarRecursos {
  // 1. MODELO Signal (Cumple el requisito de usar Signals para el estado)
  listaRecursos = signal<Recurso[]>([]);

  // 2. Inyección de dependencias
  private recursoService = inject(RecursoService);

  constructor() {
    // Cargamos los recursos al iniciar el componente
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    // Actualizamos el Signal con los datos del servicio
    this.listaRecursos.set(this.recursoService.obtenerRecursos());
  }
}