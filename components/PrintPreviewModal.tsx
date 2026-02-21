
import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { usePos } from '../context/usePos';
import { 
    checkBluetoothPermissions, 
    requestBluetoothPermissions, 
    listPairedDevices, 
    connectToDevice, 
    writeData, 
    isBluetoothEnabled,
    disconnectDevice
} from '@/services/bluetoothService';

interface PrintPreviewModalProps {
  title: string;
  content: string;
  order?: Order;
  onClose: () => void;
}

const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({ title, content, order, onClose }) => {
  const { config } = usePos();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [showDeviceList, setShowDeviceList] = useState(false);

  useEffect(() => {
      // Check initial connection state
      // Note: isConnected() from plugin might be async, but we can't easily check it on mount without side effects.
      // We'll assume disconnected initially or check if we have a stored device ID?
      // For now, let's just start fresh.
      return () => {
          // Cleanup if needed
      };
  }, []);

  const handleScan = async () => {
      setIsConnecting(true);
      setError(null);
      try {
          // 1. Check/Request Permissions
          const hasPermission = await checkBluetoothPermissions();
          if (!hasPermission) {
              const granted = await requestBluetoothPermissions();
              if (!granted) {
                  throw new Error("Bluetooth permissions denied. Please allow Bluetooth access in settings.");
              }
          }

          // 2. Check if Bluetooth is enabled
          const enabled = await isBluetoothEnabled();
          if (!enabled) {
              throw new Error("Bluetooth is disabled. Please turn it on.");
          }

          // 3. List Paired Devices
          const pairedDevices = await listPairedDevices();
          if (pairedDevices.length === 0) {
              throw new Error("No paired devices found. Please pair your printer in Android Bluetooth Settings first.");
          }

          setDevices(pairedDevices);
          setShowDeviceList(true);

      } catch (err: any) {
          setError(err.message || "Connection error");
      } finally {
          setIsConnecting(false);
      }
  };

  const handleConnectToDevice = async (device: any) => {
      setIsConnecting(true);
      setError(null);
      try {
          await connectToDevice(device.address);
          setIsConnected(true);
          setShowDeviceList(false);
      } catch (err: any) {
          setError("Failed to connect: " + (err.message || err));
      } finally {
          setIsConnecting(false);
      }
  };

  const handlePrint = async () => {
      if (!isConnected) {
          setError("Printer not connected. Please connect first.");
          return;
      }

      try {
          const encoder = new TextEncoder();
          const data = encoder.encode(content);
          await writeData(data);
          
          // Also print via console for debugging
          console.log("--- ESC/POS COMMANDS SENT ---");
          console.log(content.replace(/[\x00-\x1F\x7F-\x9F]/g, (match) => {
            const hex = match.charCodeAt(0).toString(16).toUpperCase();
            return `\\x${hex.padStart(2, '0')}`;
          }));
          console.log("-----------------------------");
      } catch (err: any) {
          setError("Printing failed: " + (err.message || err));
          setIsConnected(false); // Assume disconnected on error
      }
  };

  const handleRawBT = () => {
      // RawBT is an Android app that accepts print jobs via URL scheme
      // Format: rawbt:base64,base64_encoded_data
      const encoder = new TextEncoder();
      const data = encoder.encode(content);
      let binary = '';
      const len = data.byteLength;
      for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(data[i]);
      }
      const base64 = window.btoa(binary);
      window.location.href = `rawbt:base64,${base64}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-black relative" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                {error}
            </div>
        )}

        {showDeviceList ? (
            <div className="bg-gray-100 p-4 border border-gray-300 rounded-md mb-4 max-h-[50vh] overflow-y-auto">
                <h3 className="font-bold mb-2">Select Printer:</h3>
                <div className="space-y-2">
                    {devices.map((device, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleConnectToDevice(device)}
                            className="w-full text-left p-3 bg-white border border-gray-300 rounded hover:bg-blue-50 flex justify-between items-center"
                        >
                            <span className="font-bold">{device.name || "Unknown Device"}</span>
                            <span className="text-xs text-gray-500">{device.address}</span>
                        </button>
                    ))}
                </div>
                <button 
                    onClick={() => setShowDeviceList(false)}
                    className="mt-4 w-full py-2 bg-gray-300 rounded text-sm font-bold"
                >
                    Cancel
                </button>
            </div>
        ) : (
            <div 
            className="bg-gray-100 p-4 border border-gray-300 rounded-md font-mono text-xs overflow-y-auto max-h-[50vh]"
            style={{ width: '302px' /* Simulate 58mm paper width */ }}
            >
            {order ? (
                <div className="flex flex-col items-center">
                    {/* Preview Content (Simplified for brevity as it's just visual) */}
                    <div className="font-bold text-lg text-center mb-1">{config.name}</div>
                    <div className="text-center mb-2">Coles Park, Bangalore</div>
                    <div className="w-full border-b border-dashed border-gray-400 my-2"></div>
                    <div className="w-full flex justify-between">
                        <span>Bill No:</span>
                        <span>{order.billNumber}</span>
                    </div>
                    <div className="w-full flex justify-between mb-2">
                        <span>Date:</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</span>
                    </div>
                    {/* ... rest of the preview ... */}
                    <div className="text-center text-gray-500 italic mt-4">
                        (Preview only - Actual print layout may vary)
                    </div>
                </div>
            ) : (
                <div className="whitespace-pre-wrap">{content}</div>
            )}
            </div>
        )}
        
        <div className="flex flex-col gap-3 mt-6">
          {!showDeviceList && (
              <div className="flex gap-2">
                  <button 
                    onClick={handleScan} 
                    disabled={isConnecting || isConnected}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm ${isConnected ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}
                  >
                      {isConnecting ? 'Scanning...' : isConnected ? 'Printer Connected' : 'Connect Printer (BT)'}
                  </button>
                  <button 
                    onClick={handleRawBT}
                    className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300 font-bold py-2 rounded-lg text-sm"
                    title="Use RawBT App for Android"
                  >
                      Print via App
                  </button>
              </div>
          )}
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 rounded-lg">Close</button>
            <button 
                onClick={handlePrint} 
                disabled={!isConnected}
                className={`flex-1 font-bold py-2 rounded-lg ${isConnected ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-300 text-white cursor-not-allowed'}`}
            >
                Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPreviewModal;
