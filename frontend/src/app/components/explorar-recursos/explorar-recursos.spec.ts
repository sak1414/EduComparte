import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorarRecursos } from './explorar-recursos';

describe('ExplorarRecursos', () => {
  let component: ExplorarRecursos;
  let fixture: ComponentFixture<ExplorarRecursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarRecursos],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorarRecursos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
