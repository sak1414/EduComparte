// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulamos un usuario registrado (¡Ahora de la Continental!)
  private usuarioRegistrado: Usuario = {
    correo: 'estudiante@continental.edu.pe', // <-- CAMBIO AQUÍ
    contrasena: '123456',
    recordarSesion: false
  };

  private usuarioLogueado: Usuario | null = null;

  constructor() { }

  iniciarSesion(usuario: Usuario): boolean {
    if (usuario.correo === this.usuarioRegistrado.correo && 
        usuario.contrasena === this.usuarioRegistrado.contrasena) {
      this.usuarioLogueado = usuario;
      console.log(' Login exitoso:', usuario);
      return true;
    }
    console.log(' Credenciales incorrectas');
    return false;
  }

  estaLogueado(): boolean {
    return this.usuarioLogueado !== null;
  }

  cerrarSesion(): void {
    this.usuarioLogueado = null;
    console.log(' Sesión cerrada');
  }
}