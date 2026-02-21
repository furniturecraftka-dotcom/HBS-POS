interface BluetoothSerial {
  connect(macAddress: string, success: () => void, failure: (err: any) => void): void;
  connectInsecure(macAddress: string, success: () => void, failure: (err: any) => void): void;
  disconnect(success: () => void, failure: (err: any) => void): void;
  list(success: (devices: any[]) => void, failure: (err: any) => void): void;
  isEnabled(success: () => void, failure: (err: any) => void): void;
  isConnected(success: () => void, failure: (err: any) => void): void;
  available(success: (length: number) => void, failure: (err: any) => void): void;
  read(success: (data: any) => void, failure: (err: any) => void): void;
  readUntil(delimiter: string, success: (data: any) => void, failure: (err: any) => void): void;
  subscribe(delimiter: string, success: (data: any) => void, failure: (err: any) => void): void;
  unsubscribe(success: () => void, failure: (err: any) => void): void;
  subscribeRawData(success: (data: any) => void, failure: (err: any) => void): void;
  unsubscribeRawData(success: () => void, failure: (err: any) => void): void;
  clear(success: () => void, failure: (err: any) => void): void;
  readRSSI(success: (rssi: any) => void, failure: (err: any) => void): void;
  showBluetoothSettings(success: () => void, failure: (err: any) => void): void;
  enable(success: () => void, failure: (err: any) => void): void;
  discoverUnpaired(success: (devices: any[]) => void, failure: (err: any) => void): void;
  setDeviceDiscoveredListener(notify: (device: any) => void): void;
  clearDeviceDiscoveredListener(): void;
  setName(newName: string): void;
  setDiscoverable(discoverableDuration: number): void;
  write(data: any, success: () => void, failure: (err: any) => void): void;
}

interface Window {
  bluetoothSerial: BluetoothSerial;
}
