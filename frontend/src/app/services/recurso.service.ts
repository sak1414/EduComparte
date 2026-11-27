import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recurso {
  id?: number;
  titulo: string;
  universidad: string;
  asignatura: string;
  categoria: string;
  descripcion: string;
  url: string;
  autor: string;
  tipo: string;
}

export interface RecursoCrear {

  titulo: string;
  universidad: string;
  asignatura: string;
  categoria: string;
  descripcion: string;
  url: string;
  autor: string;
  tipo?: string;  
}


@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private apiUrl = 'http://127.0.0.1:8000/api/recursos';

  constructor(private http: HttpClient) {}

  obtenerRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.apiUrl);
  }

  obtenerRecursoPorId(id: number): Observable<Recurso> {
    return this.http.get<Recurso>(`${this.apiUrl}/${id}`);
  }

  guardarRecurso(recurso: RecursoCrear): Observable<Recurso> {
    return this.http.post<Recurso>(this.apiUrl, recurso);
  }

  actualizarRecurso(id: number, recurso: RecursoCrear): Observable<Recurso> {
    return this.http.put<Recurso>(`${this.apiUrl}/${id}`, recurso);
  }

  eliminarRecurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}