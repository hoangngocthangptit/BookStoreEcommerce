import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilalogUnlockComponent } from './dilalog-unlock.component';

describe('DilalogUnlockComponent', () => {
  let component: DilalogUnlockComponent;
  let fixture: ComponentFixture<DilalogUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilalogUnlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DilalogUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
