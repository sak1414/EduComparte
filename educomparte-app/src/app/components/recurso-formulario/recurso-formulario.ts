import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recurso } from '../../interfaces/recurso';
import { RecursoService } from '../../services/recurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recurso-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recurso-formulario.html',
  styleUrl: './recurso-formulario.css'
})
export class RecursoFormularioComponent {
  
  private recursoModelo = signal<Recurso>({
    titulo: '', universidad: '', asignatura: '', categoria: '', descripcion: '', url: '', autor: ''
  });

  formularioRecurso: FormGroup;
  listaRecursos: Recurso[] = [];
  
  private recursoService = inject(RecursoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  recursoId: number | null = null;
  esEdicion = false;

  constructor() {
    this.formularioRecurso = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      universidad: new FormControl('', [Validators.required]),
      asignatura: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
      url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      autor: new FormControl('', [Validators.required])
    });

    this.mostrar();

    // Detectar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.recursoId = Number(params['id']);
        this.esEdicion = true;
        this.cargarDatosParaEditar();
      }
    });
  }

  cargarDatosParaEditar(): void {
    const recurso = this.recursoService.obtenerRecursos().find(r => r.id === this.recursoId);
    if (recurso) {
      this.formularioRecurso.patchValue(recurso);
      this.recursoModelo.set(recurso);
    }
  }

  guardar(): void {
    if (this.formularioRecurso.valid) {
      const datosFormulario = this.formularioRecurso.value;

      if (this.esEdicion && this.recursoId) {
        // MODO EDITAR
        this.recursoService.actualizarRecurso(this.recursoId, datosFormulario);
        Swal.fire({ title: '¡Actualizado!', text: 'El recurso se modificó correctamente.', icon: 'success', confirmButtonColor: '#0d6efd' });
      } else {
        // MODO CREAR
        const nuevoRecurso: Recurso = {
          ...datosFormulario,
          id: Date.now(),
          fecha: 'Justo ahora',
          tipo: 'PDF'
        };
        this.recursoService.guardarRecurso(nuevoRecurso);
        Swal.fire({ title: '¡Publicado!', text: 'Tu aporte ayudará a muchos estudiantes.', icon: 'success', confirmButtonColor: '#0d6efd' });
      }

      this.router.navigate(['/explorar']); // Redirigir a la lista
    } else {
      this.formularioRecurso.markAllAsTouched();
      Swal.fire({ title: 'Campos incompletos', text: 'Revisa los campos marcados en rojo.', icon: 'warning', confirmButtonColor: '#0d6efd' });
    }
  }

  limpiar(): void {
    this.formularioRecurso.reset();
    this.router.navigate(['/home']);
  }

  mostrar(): void {
    this.listaRecursos = this.recursoService.obtenerRecursos();
  }
}