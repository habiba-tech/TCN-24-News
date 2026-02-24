import { TestBed } from '@angular/core/testing';

import { FetchVideo } from './fetch-video';

describe('FetchVideo', () => {
  let service: FetchVideo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchVideo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
