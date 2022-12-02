import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionChoiceComponent } from './session-choice.component';

describe('SessionChoiceComponent', () => {
  let component: SessionChoiceComponent;
  let fixture: ComponentFixture<SessionChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
