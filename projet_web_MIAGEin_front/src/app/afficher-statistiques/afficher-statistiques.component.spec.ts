import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherStatistiquesComponent } from './afficher-statistiques.component';

describe('AfficherStatistiquesComponent', () => {
  let component: AfficherStatistiquesComponent;
  let fixture: ComponentFixture<AfficherStatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherStatistiquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
