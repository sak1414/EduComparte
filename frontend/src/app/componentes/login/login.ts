import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UsuarioLogin } from '../../servicios/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Señales para el formulario
  correo = signal<string>('');
  contrasena = signal<string>('');
  cargando = signal<boolean>(false);

  // Inyección de dependencias
  private authService = inject(AuthService);
  private router = inject(Router);

  // Métodos para actualizar las señales
  actualizarCorreo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.correo.set(input.value);
  }

  actualizarContrasena(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.contrasena.set(input.value);
  }

  // Método para iniciar sesión
  iniciarSesion(): void {
    // Validación de campos vacíos
    if (!this.correo() || !this.contrasena()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor completa todos los campos',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    // Preparar credenciales
    const credenciales: UsuarioLogin = {
      correo: this.correo(),
      contrasena: this.contrasena()
    };

    this.cargando.set(true);

    // Llamar al servicio de autenticación
    this.authService.login(credenciales).subscribe({
      next: (respuesta) => {
        this.cargando.set(false);
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Inicio de sesión exitoso',
          timer: 1500,
          showConfirmButton: false
        });
        // Redirigir al inicio después del login exitoso
        setTimeout(() => this.router.navigate(['/inicio']), 1500);
      },
      error: (err) => {
        this.cargando.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.detail || 'Credenciales incorrectas',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}