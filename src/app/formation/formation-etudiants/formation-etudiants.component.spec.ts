import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEtudiantsComponent } from './formation-etudiants.component';

describe('FormationEtudiantsComponent', () => {
  let component: FormationEtudiantsComponent;
  let fixture: ComponentFixture<FormationEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationEtudiantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
