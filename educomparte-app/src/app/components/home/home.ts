// src/app/components/home/home.ts
import { Component } from '@angular/core';
import { RecursoFormularioComponent } from '../recurso-formulario/recurso-formulario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecursoFormularioComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}