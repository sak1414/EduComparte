// src/app/services/recurso.service.ts
import { Injectable } from '@angular/core';
import { Recurso } from '../interfaces/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private recursosDB: Recurso[] = [];

  constructor() { }

  guardarRecurso(recurso: Recurso): void {
    this.recursosDB.push(recurso);
    console.log('💾 Servicio: Recurso guardado. Total:', this.recursosDB.length);
  }

  obtenerRecursos(): Recurso[] {
    return this.recursosDB;
  }
}