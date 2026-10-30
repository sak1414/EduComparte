import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router'; // Para el breadcrumb
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
  
  // 1. MODELO Signal (Requisito del docente: usar Signals para el estado)
  private recursoModelo = signal<Recurso>({
    titulo: '',
    universidad: '',
    asignatura: '',
    categoria: '',
    descripcion: '',
    url: '',
    autor: ''
  });

  // 2. FORMULARIO Reactivo (Compatible con Angular 22 y validaciones estrictas)
  formularioRecurso: FormGroup;
  listaRecursos: Recurso[] = [];

  private recursoService = inject(RecursoService);

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
  }

  guardar(): void {
    if (this.formularioRecurso.valid) {
      // Sincronizamos el Signal con los valores del formulario
      this.recursoModelo.set({
        ...this.formularioRecurso.value,
        id: Date.now()
      });

      // Enviamos al servicio
      this.recursoService.guardarRecurso(this.recursoModelo());
      
      Swal.fire({
        title: '¡Recurso Publicado!',
        text: 'Tu aporte ayudará a muchos estudiantes de Huancayo.',
        icon: 'success',
        confirmButtonColor: '#0d6efd'
      });

      this.limpiar();
      this.mostrar();
    } else {
      this.formularioRecurso.markAllAsTouched();
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor revisa los campos marcados en rojo.',
        icon: 'warning',
        confirmButtonColor: '#0d6efd'
      });
    }
  }

  limpiar(): void {
    this.recursoModelo.set({
      titulo: '', universidad: '', asignatura: '', categoria: '', descripcion: '', url: '', autor: ''
    });
    this.formularioRecurso.reset();
  }

  mostrar(): void {
    this.listaRecursos = this.recursoService.obtenerRecursos();
  }
}