import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilalogChangePassWordComponent } from './dilalog-change-pass-word.component';

describe('DilalogChangePassWordComponent', () => {
  let component: DilalogChangePassWordComponent;
  let fixture: ComponentFixture<DilalogChangePassWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilalogChangePassWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DilalogChangePassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
