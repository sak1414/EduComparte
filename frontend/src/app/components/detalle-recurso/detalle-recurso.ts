import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recurso } from '../../interfaces/recurso';
import { RecursoService } from '../../services/recurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-recurso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-recurso.html',
  styleUrl: './detalle-recurso.css'
})
export class DetalleRecursoComponent {
  // 1. MODELO Signal para el recurso seleccionado
  recursoSeleccionado = signal<Recurso | null>(null);

  // 2. Inyeccion de dependencias
  private recursoService = inject(RecursoService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.cargarDetalle();
  }

  cargarDetalle(): void {
    // Leemos el ID de la URL (ej: /detalle/1 -> id = 1)
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);

    // Buscamos el recurso en el servicio
    this.recursoService.obtenerRecursos().subscribe({
      next: (recursos: Recurso[]) => {
        const encontrado = recursos.find((r: Recurso) => r.id === id);
        if (encontrado) {
          this.recursoSeleccionado.set(encontrado);
        } else {
          Swal.fire({
            title: 'Recurso no encontrado',
            text: 'El recurso que buscas no existe.',
            icon: 'error',
            confirmButtonColor: '#0d6efd'
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar recursos:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo conectar con el servidor.',
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

  descargar(): void {
    const recurso = this.recursoSeleccionado();
    if (recurso) {
      Swal.fire({
        title: 'Descargando...',
        text: `Se esta descargando "${recurso.titulo}"`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

  guardarParaDespues(): void {
    Swal.fire({
      title: 'Guardado',
      text: 'El recurso se guardo en tu lista de favoritos',
      icon: 'success',
      confirmButtonColor: '#0d6efd'
    });
  }
}