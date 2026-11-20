
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service'; // <-- Importación directa y estándar
import Swal from 'sweetalert2'; // <-- Usamos SweetAlert2 para alertas profesionales

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // 1. MODELO Signal (cumpliendo requisito de usar Signals)
  private usuarioModelo = signal<Usuario>({
    correo: '',
    contrasena: '',
    recordarSesion: false
  });

  // 2. FORMULARIO Reactivo (compatible y estable en Angular)
  formularioLogin: FormGroup;

  // 3. Inyección de dependencias estándar de Angular (¡Así de simple!)
  private authService = inject(AuthService);

  constructor() {
    this.formularioLogin = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required]),
      recordarSesion: new FormControl(false)
    });
  }

  // 4. Método para iniciar sesión
  iniciarSesion(): void {
    if (this.formularioLogin.valid) {
      const usuario: Usuario = {
        correo: this.formularioLogin.value.correo,
        contrasena: this.formularioLogin.value.contrasena,
        recordarSesion: this.formularioLogin.value.recordarSesion
      };

      const exitoso = this.authService.iniciarSesion(usuario);

      if (exitoso) {
        // Actualizar el Signal con los datos del usuario logueado
        this.usuarioModelo.set(usuario);
        
        // Alerta profesional con SweetAlert2
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#0d6efd'
        });
        
        this.limpiar();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Correo o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          confirmButtonColor: '#dc3545'
        });
      }
    } else {
      // Marcar todos los campos como tocados para mostrar errores de validación
      this.formularioLogin.markAllAsTouched();
    }
  }

  // 5. Método limpiar
  limpiar() {
    this.usuarioModelo.set({
      correo: '',
      contrasena: '',
      recordarSesion: false
    });
    this.formularioLogin.reset();
  }
}