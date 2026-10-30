
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

 
  // CREATE - Método para guardar un recurso
 
  guardarRecurso(recurso: Recurso): void {
    this.recursosDB.push(recurso);
    console.log('✅ Recurso guardado:', recurso.titulo);
    console.log('📊 Total de recursos:', this.recursosDB.length);
  }

  
  // READ - Método para obtener todos los recursos

  obtenerRecursos(): Recurso[] {
    return this.recursosDB;
  }

 
  // UPDATE - Método para actualizar un recurso
 
  actualizarRecurso(id: number, recursoActualizado: Recurso): boolean {
    const index = this.recursosDB.findIndex(r => r.id === id);
    
    if (index !== -1) {
      // Actualizamos el recurso manteniendo el mismo ID
      this.recursosDB[index] = { ...recursoActualizado, id };
      console.log('✏️ Recurso actualizado:', recursoActualizado.titulo);
      return true;
    }
    
    console.log(' No se encontró el recurso con ID:', id);
    return false;
  }

 
  // DELETE - Método para eliminar un recurso
 
  eliminarRecurso(id: number): void {
    const cantidadAntes = this.recursosDB.length;
    this.recursosDB = this.recursosDB.filter(r => r.id !== id);
    const cantidadDespues = this.recursosDB.length;
    
    if (cantidadAntes !== cantidadDespues) {
      console.log(' Recurso eliminado con ID:', id);
    } else {
      console.log(' No se encontró el recurso con ID:', id);
    }
  }
}