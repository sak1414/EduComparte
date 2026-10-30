// src/app/components/recurso-formulario/recurso-formulario.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recurso } from '../../interfaces/recurso';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-recurso-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recurso-formulario.html',
  styleUrl: './recurso-formulario.css'
})
export class RecursoFormularioComponent {
  formularioRecurso: FormGroup;
  listaRecursos: Recurso[] = [];

  constructor(private recursoService: RecursoService) {
    this.formularioRecurso = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      curso: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
      url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      autor: new FormControl('', [Validators.required])
    });
    this.mostrar();
  }

  guardar(): void {
    if (this.formularioRecurso.valid) {
      const nuevoRecurso: Recurso = {
        ...this.formularioRecurso.value,
        id: Date.now()
      };

      this.recursoService.guardarRecurso(nuevoRecurso);
      this.formularioRecurso.reset();
      this.mostrar();
      alert('¡Recurso publicado con éxito!');
    } else {
      this.formularioRecurso.markAllAsTouched();
    }
  }

  mostrar(): void {
    this.listaRecursos = this.recursoService.obtenerRecursos();
  }
}