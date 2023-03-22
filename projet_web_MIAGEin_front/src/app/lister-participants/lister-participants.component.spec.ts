import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerParticipantsComponent } from './lister-participants.component';

describe('ListerParticipantsComponent', () => {
  let component: ListerParticipantsComponent;
  let fixture: ComponentFixture<ListerParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
