import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionPersonneComponent } from './inscription-personne.component';

describe('InscriptionPersonneComponent', () => {
  let component: InscriptionPersonneComponent;
  let fixture: ComponentFixture<InscriptionPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionPersonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
