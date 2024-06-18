import { Injectable } from '@angular/core';
import { UsbSerial, UsbSerialPlugin, UsbSerialOptions, UsbSerialDevice } from 'usb-serial-plugin';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectedDeviceInterface } from './devices.interface';

// @Injectable({
//   providedIn: 'root'
// })
export class UsbSerialService {
  private dataListenerHandle?: PluginListenerHandle;
  private attachedListenerHandle?: PluginListenerHandle;
  private logListenerHandle?: PluginListenerHandle;
  constructor() { }
  
  async closeSerial() {
    await UsbSerial.closeSerial()
  }

  async openSerialPort(options: UsbSerialOptions){
  UsbSerial.openSerial(options)
  //await UsbSerial.readSerial().then((data)=> console.log(data))
  }

  async logListener() {
    // this.logListenerHandle = await UsbSerial.addListener('log', (data) => {
    //   console.log('Log Event:', data);
    // });
    
    this.dataListenerHandle = await UsbSerial.addListener('data', (data) => {
      console.log('Log Event:', data);
    })
    // this.killListener()
  }

async readThenKill(){
  await this.logListener();
}

  killLogListener() {
    if (this.logListenerHandle) {
      this.logListenerHandle.remove();
    }
  }

  killDataListener() {
    if (this.dataListenerHandle) {
      this.dataListenerHandle.remove();
    }
  }

  killAttachedListener() {
    if (this.dataListenerHandle) {
      this.dataListenerHandle.remove();
    }
  }

 async logDevices() {
    console.log (await UsbSerial.connectedDevices())
  }

  async sendSample(data: string) {
    await UsbSerial.writeSerial({data: data})
  }

  

  ionViewWillLeave() {
    // Ensure to remove the listener when the component is destroyed
    // this.killListener();
    // console.log('listener killed');
  }


//////////////////////////////
//listening for a new device, recording the device ID, then killing the listener once device is detected
async checkRecordNewDevice(): Promise<UsbSerialDevice | null> {
  let deviceToCheck: number = 0;
  let data: UsbSerialDevice = {pid:0,vid:0,did:0}
  const attachedPromise = new Promise<void>(resolve => {
    this.attachedListenerHandle = UsbSerial.addListener('attached', (data => {
      deviceToCheck = data.did
      resolve();
    }))
  })
  await attachedPromise;
  this.killAttachedListener();
  const connectedDevices: ConnectedDeviceInterface[] = (await UsbSerial.connectedDevices()).devices;
  
  for(let i = 0; i < connectedDevices.length; i++) {
    if ((connectedDevices[i].device.deviceId === deviceToCheck) && connectedDevices[i].driver) {
      data = {
        pid: connectedDevices[i].device.productId,
        vid: connectedDevices[i].device.vendorId,
        did: connectedDevices[i].device.deviceId,
      }
      return data;
      
    } 
   }
  return null
}


async checkAttachedListener(){
  console.log(await this.checkRecordNewDevice())
}


  
}
