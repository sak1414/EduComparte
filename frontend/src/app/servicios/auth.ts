import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UsuarioRegistro {
  nombre: string;
  correo: string;
  contrasena: string;
  universidad: string;
  rol: string;
}

export interface UsuarioLogin {
  correo: string;
  contrasena: string;
}

export interface RespuestaLogin {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(private http: HttpClient) {}

  registrar(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  login(credentials: UsuarioLogin): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('usuario', credentials.correo);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaAutenticado(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }
}