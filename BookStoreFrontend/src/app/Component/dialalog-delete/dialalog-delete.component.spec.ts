import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialalogDeleteComponent } from './dialalog-delete.component';

describe('DialalogDeleteComponent', () => {
  let component: DialalogDeleteComponent;
  let fixture: ComponentFixture<DialalogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialalogDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialalogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
