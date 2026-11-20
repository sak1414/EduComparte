// src/app/components/recurso-formulario/recurso-formulario.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoService } from '../../services/recurso.service';
import { Recurso } from '../../interfaces/recurso';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs'; // <-- NUEVO: Reemplaza a toPromise()

@Component({
  selector: 'app-recurso-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recurso-formulario.html',
  styleUrl: './recurso-formulario.css'
})
export class RecursoFormularioComponent {
  
  private recursoService = inject(RecursoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  recursoId: number | null = null;
  esEdicion = false;

  // Formulario con validaciones
  formularioRecurso = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    universidad: new FormControl('', [Validators.required]),
    asignatura: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
    url: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    tipo: new FormControl('PDF')
  });

  constructor() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.recursoId = Number(params['id']);
        this.esEdicion = true;
        this.cargarDatosParaEditar();
      }
    });
  }

  cargarDatosParaEditar(): void {
    if (this.recursoId) {
      this.recursoService.obtenerRecursoPorId(this.recursoId).subscribe({
        next: (recurso) => {
          this.formularioRecurso.patchValue(recurso);
        },
        error: (error) => console.error('Error al cargar recurso:', error)
      });
    }
  }

  // ✅ MÉTODO DE SUBMISSION CON ASYNC/AWAIT (Requisito Semana 12)
  async onSubmit(): Promise<void> {
    if (this.formularioRecurso.invalid) {
      this.formularioRecurso.markAllAsTouched();
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Revisa los campos marcados en rojo.',
        icon: 'warning',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    // ✅ SOLUCIÓN AL ERROR DE "datos": Forzamos el tipo Recurso
    const datos = this.formularioRecurso.value as Recurso;

    try {
      if (this.esEdicion && this.recursoId) {
        // MODO EDITAR (Usamos await y firstValueFrom)
        await firstValueFrom(this.recursoService.actualizarRecurso(this.recursoId, datos));
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El recurso se modificó correctamente.',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        });
      } else {
        // MODO CREAR (Usamos await y firstValueFrom)
        await firstValueFrom(this.recursoService.guardarRecurso(datos));
        Swal.fire({
          title: '¡Publicado!',
          text: 'Tu aporte ayudará a muchos estudiantes.',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        });
      }
      
      this.router.navigate(['/explorar']);
      
    } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el recurso. Verifica el Backend.',
        icon: 'error'
      });
    }
  }

  limpiar(): void {
    this.formularioRecurso.reset();
    this.router.navigate(['/home']);
  }
}