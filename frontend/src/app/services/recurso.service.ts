// src/app/services/recurso.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso } from '../interfaces/recurso';

// ✅ ESTA ES LA IMPORTACIÓN CORRECTA AHORA:
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private http = inject(HttpClient);
  
  // Ahora sí funcionará sin errores rojos
  private apiUrl = `${environment.apiUrl}/api/recursos`;

  constructor() { }

  obtenerRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.apiUrl);
  }

  obtenerRecursoPorId(id: number): Observable<Recurso> {
    return this.http.get<Recurso>(`${this.apiUrl}/${id}`);
  }

  guardarRecurso(recurso: Recurso): Observable<Recurso> {
    return this.http.post<Recurso>(this.apiUrl, recurso);
  }

  actualizarRecurso(id: number, recurso: Recurso): Observable<Recurso> {
    return this.http.put<Recurso>(`${this.apiUrl}/${id}`, recurso);
  }

  eliminarRecurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}