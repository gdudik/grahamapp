import { TestBed } from '@angular/core/testing';

import { UsbSerialService } from './usb-serial.service';

describe('UsbSerialService', () => {
  let service: UsbSerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsbSerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
