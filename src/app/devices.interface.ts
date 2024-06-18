export interface ConnectedDeviceInterface {
   device: {
    productId: number;
    productName: string;
    vendorId: number;
    deviceId: number;
  };
     port: number;
     driver?: string;
}