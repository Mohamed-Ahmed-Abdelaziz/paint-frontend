import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSaverComponent } from './canvas-saver.component';

describe('CanvasSaverComponent', () => {
  let component: CanvasSaverComponent;
  let fixture: ComponentFixture<CanvasSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasSaverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
