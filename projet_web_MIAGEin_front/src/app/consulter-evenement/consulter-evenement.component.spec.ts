import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterEvenementComponent } from './consulter-evenement.component';

describe('ConsulterEvenementComponent', () => {
  let component: ConsulterEvenementComponent;
  let fixture: ComponentFixture<ConsulterEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterEvenementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
