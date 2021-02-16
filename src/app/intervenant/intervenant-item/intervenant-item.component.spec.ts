import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenantItemComponent } from './intervenant-item.component';

describe('IntervenantItemComponent', () => {
  let component: IntervenantItemComponent;
  let fixture: ComponentFixture<IntervenantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervenantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervenantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
