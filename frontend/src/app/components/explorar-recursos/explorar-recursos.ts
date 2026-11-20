// src/app/components/explorar-recursos/explorar-recursos.ts
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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
  
  // 1. MODELO Signal para almacenar la lista de recursos
  listaRecursos = signal<Recurso[]>([]);

  // 2. Inyección de dependencias
  private recursoService = inject(RecursoService);
  private router = inject(Router);

  constructor() {
    // Cargar los recursos al iniciar el componente
    this.cargarRecursos();
  }

  // Método para obtener los datos del Backend
  cargarRecursos(): void {
    this.recursoService.obtenerRecursos().subscribe({
      next: (recursos) => {
        // Actualizamos el Signal con los datos reales de la base de datos
        this.listaRecursos.set(recursos);
        console.log('✅ Recursos cargados desde el Backend:', recursos.length);
      },
      error: (error) => {
        console.error('❌ Error al cargar recursos:', error);
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el Backend. Verifica que esté corriendo.',
          icon: 'error'
        });
      }
    });
  }

  // Método para eliminar un recurso
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
        this.recursoService.eliminarRecurso(id).subscribe({
          next: () => {
            this.cargarRecursos(); // Recargar la lista desde el Backend
            Swal.fire({
              title: 'Eliminado',
              text: 'El recurso ha sido eliminado correctamente.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el recurso.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  // Método para navegar a la edición
  editarRecurso(id: number): void {
    this.router.navigate(['/editar', id]);
  }
}