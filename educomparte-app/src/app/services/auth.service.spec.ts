
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulamos un usuario registrado
  private usuarioRegistrado: Usuario = {
    correo: 'estudiante@uncp.edu.pe',
    contrasena: '123456',
    recordarSesion: false
  };

  private usuarioLogueado: Usuario | null = null;

  constructor() { }

  // Método para iniciar sesión
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

  // Método para verificar si hay sesión activa
  estaLogueado(): boolean {
    return this.usuarioLogueado !== null;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioLogueado = null;
    console.log('🔒 Sesión cerrada');
  }
}