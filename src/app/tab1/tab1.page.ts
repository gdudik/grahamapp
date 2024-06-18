import { Component, OnDestroy } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UsbSerialService } from '../usb-serial.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [UsbSerialService]
})
export class Tab1Page {

  constructor(
    private usbSerial: UsbSerialService
  ) {}
  async openPort () {
    const options = { deviceId: 1010, portNum: 0, baudRate: 9600, dataBits: 8, stopBits: 1, parity: 0, dtr: false, rts: false };
  await this.usbSerial.openSerialPort(options)
  }

  async listenForData() {
    await this.usbSerial.logListener()
  }

  async closeSerial() {
    this.usbSerial.closeSerial()
  }
  async logDevices() {
    await this.usbSerial.logDevices()
  }

  killListener() {
    this.usbSerial.killDataListener()
  }

  sendSample() {
    this.usbSerial.sendSample('Hello from tab 1')
  }
}
