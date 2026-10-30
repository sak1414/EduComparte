// src/app/components/explorar-recursos/explorar-recursos.ts
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // <-- Router agregado aquí
import { Recurso } from '../../interfaces/recurso';
import { RecursoService } from '../../services/recurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explorar-recursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './explorar-recursos.html',
  styleUrl: './explorar-recursos.css'
})
export class ExplorarRecursos {
  // 1. MODELO Signal
  listaRecursos = signal<Recurso[]>([]);

  // 2. Inyección de dependencias (al mismo nivel)
  private recursoService = inject(RecursoService);
  private router = inject(Router);

  constructor() {
    this.cargarRecursos();
  }

  // Método 1: Cargar
  cargarRecursos(): void {
    this.listaRecursos.set(this.recursoService.obtenerRecursos());
  }

  // Método 2: Eliminar (AL MISMO NIVEL QUE cargarRecursos)
  eliminarRecurso(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recursoService.eliminarRecurso(id);
        this.cargarRecursos(); // Recargar la lista
        Swal.fire({ 
          title: 'Eliminado', 
          text: 'El recurso ha sido eliminado.', 
          icon: 'success', 
          timer: 1500, 
          showConfirmButton: false 
        });
      }
    });
  }

  // Método 3: Editar (AL MISMO NIVEL QUE los anteriores)
  editarRecurso(id: number): void {
    this.router.navigate(['/editar', id]);
  }
}