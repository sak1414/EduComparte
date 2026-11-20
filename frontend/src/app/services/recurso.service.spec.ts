import { TestBed } from '@angular/core/testing';
import { RecursoService } from './recurso.service'; // <-- Corregido: importar el SERVICIO

describe('RecursoService', () => { // <-- Corregido: nombre del servicio
  let service: RecursoService; // <-- Corregido: tipo RecursoService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursoService); // <-- Corregido: inyectar RecursoService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});