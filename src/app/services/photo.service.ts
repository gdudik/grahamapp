import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource,  } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { UsbSerialPlugin, UsbSerialOptions, UsbSerial, UsbSerialDevice } from 'usb-serial-plugin';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private platform: Platform;

  constructor(platform: Platform) { 
    this.platform = platform;
  }
  
  public async readDevices() {
    const returnedDevices = await UsbSerial.connectedDevices()
    console.log(returnedDevices)
  }
ionViewWillEnter() {
}
  public async openPort(device: number) {
    UsbSerial.openSerial({
      deviceId: device,
      portNum: 0,
      baudRate: 9600,
      dataBits: 8,
      parity: 0,
      stopBits: 1
    })
    console.log('port opened')
  }

  


  public async readData(){
    const receivedData = await UsbSerial.readSerial()
    console.log(receivedData)
  }

}

