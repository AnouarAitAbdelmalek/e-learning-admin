import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantItemComponent } from './etudiant-item.component';

describe('EtudiantItemComponent', () => {
  let component: EtudiantItemComponent;
  let fixture: ComponentFixture<EtudiantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
