import { Component, OnDestroy } from "@angular/core";
import { PhotoService } from "../services/photo.service";
import { UsbSerialService } from "../usb-serial.service";
@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
  providers: [UsbSerialService],
})
export class Tab2Page {
  constructor(
    private photoService: PhotoService,
    private usbSerial: UsbSerialService
  ) {}

  async openPort() {
    const options = {
      deviceId: 1009,
      portNum: 0,
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1,
      parity: 0,
      dtr: false,
      rts: false,
    };
    await this.usbSerial.openSerialPort(options);
  }

  async listenForData() {
    await this.usbSerial.logListener();
  }

  async logDevices() {
    await this.usbSerial.logDevices();
  }

  killListener() {
    this.usbSerial.killDataListener();
  }

  sendSample() {
    this.usbSerial.sendSample("Hello from tab 2");
  }

  async closeSerial() {
    this.usbSerial.closeSerial()
  }
}
