import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenantFormComponent } from './intervenant-form.component';

describe('IntervenantFormComponent', () => {
  let component: IntervenantFormComponent;
  let fixture: ComponentFixture<IntervenantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervenantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervenantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
