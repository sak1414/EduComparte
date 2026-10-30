
import { Injectable } from '@angular/core';
import { Recurso } from '../interfaces/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  // Simulamos una base de datos con algunos recursos iniciales
  private recursosDB: Recurso[] = [
    {
      id: 1,
      titulo: 'Cálculo Diferencial - Solucionario Parcial 2024-1',
      universidad: 'UNCP',
      asignatura: 'Matemáticas',
      categoria: 'Ciencias Exactas',
      descripcion: 'Recopilación de ejercicios paso a paso resueltos con el docente Ing. Gómez, incluye gráficas y explicaciones detalladas.',
      url: 'https://ejemplo.com/calculo.pdf',
      autor: 'Lucía Canchanya',
      fecha: 'Hace 2 días',
      tipo: 'PDF'
    },
    {
      id: 2,
      titulo: 'Guía Completa de Microcontroladores ESP32 & IoT',
      universidad: 'Universidad Continental',
      asignatura: 'Programación',
      categoria: 'Tecnología',
      descripcion: 'Laboratorios integrales con código en C++/Arduino, esquemas Fritzing y manual de instalación.',
      url: 'https://ejemplo.com/esp32.zip',
      autor: 'Javier Palomino',
      fecha: 'Hace 4 días',
      tipo: 'ZIP'
    }
  ];

  constructor() { }

  guardarRecurso(recurso: Recurso): void {
    this.recursosDB.push(recurso);
    console.log(' Recurso guardado. Total:', this.recursosDB.length);
  }

  obtenerRecursos(): Recurso[] {
    return this.recursosDB;
  }
}