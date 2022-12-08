import { TestBed } from '@angular/core/testing';

import { CanvasSaverService } from './canvas-saver.service';

describe('CanvasSaverService', () => {
  let service: CanvasSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
