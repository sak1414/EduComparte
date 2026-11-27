import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UsuarioRegistro } from '../../servicios/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {

  nombre = signal<string>('');
  correo = signal<string>('');
  contrasena = signal<string>('');
  universidad = signal<string>('');
  rol = signal<string>('estudiante');
  cargando = signal<boolean>(false);

  // Lista de universidades de Huancayo para el select
  universidades = signal<string[]>([
    'UNCP',
    'UPLA',
    'Universidad Continental',
    'UNJFSC',
    'UCV',
    'Otra'
  ]);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  actualizarNombre(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nombre.set(input.value);
  }

  actualizarCorreo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.correo.set(input.value);
  }

  actualizarContrasena(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.contrasena.set(input.value);
  }

  actualizarUniversidad(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.universidad.set(select.value);
  }

  actualizarRol(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.rol.set(select.value);
  }

  registrarUsuario(): void {
    const usuario: UsuarioRegistro = {
      nombre: this.nombre(),
      correo: this.correo(),
      contrasena: this.contrasena(),
      universidad: this.universidad(),
      rol: this.rol()
    };

    // Validación de campos vacíos
    if (!usuario.nombre || !usuario.correo || !usuario.contrasena || !usuario.universidad) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos obligatorios'
      });
      return;
    }

    // Validación de contraseña mínima (seguridad básica)
    if (usuario.contrasena.length < 8) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 8 caracteres'
      });
      return;
    }

    this.cargando.set(true);

    this.authService.registrar(usuario).subscribe({
      next: () => {
        this.cargando.set(false);
        Swal.fire({
          icon: 'success',
          title: 'Cuenta creada',
          text: 'Ya puedes iniciar sesión',
          timer: 1500,
          showConfirmButton: false
        });
        // Redirigir al login después del registro exitoso
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.cargando.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: err.error?.detail || 'El correo ya está registrado'
        });
      }
    });
  }
}