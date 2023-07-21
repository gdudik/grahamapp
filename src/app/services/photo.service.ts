import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource,  } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { UsbSerialPlugin, UsbSerialOptions, UsbSerialDevice, UsbSerial } from 'usb-serial-plugin';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private platform: Platform;

  constructor(platform: Platform) { 
    this.platform = platform;
  }

  public async addNewtoGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
  }

  public async readDevices() {
    const returnedDevices = await UsbSerial.connectedDevices()
    console.log(returnedDevices)
  }


}

