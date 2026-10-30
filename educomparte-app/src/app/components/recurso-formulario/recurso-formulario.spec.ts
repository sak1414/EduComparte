import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecursoFormulario } from './recurso-formulario';

describe('RecursoFormulario', () => {
  let component: RecursoFormulario;
  let fixture: ComponentFixture<RecursoFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursoFormulario],
    }).compileComponents();

    fixture = TestBed.createComponent(RecursoFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
