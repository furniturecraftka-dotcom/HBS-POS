
import React from 'react';

interface PrintPreviewModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({ title, content, onClose }) => {
  const handlePrint = () => {
      // In a real web-to-native app (e.g., Electron), you'd send this `content`
      // to the main process to be printed via a Bluetooth/USB library.
      // For web, we can't directly access thermal printers this way.
      alert("Printing is simulated. Check console for ESC/POS commands.");
      console.log("--- ESC/POS COMMANDS ---");
      console.log(content.replace(/[\x00-\x1F\x7F-\x9F]/g, (match) => {
        const hex = match.charCodeAt(0).toString(16).toUpperCase();
        return `\\x${hex.padStart(2, '0')}`;
      }));
      console.log("------------------------");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-black" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
        
        <div 
          className="bg-gray-100 p-4 border border-gray-300 rounded-md font-mono text-xs whitespace-pre-wrap overflow-x-auto"
          style={{ width: '302px' /* Simulate 58mm paper width */ }}
        >
          {content}
        </div>
        
        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 rounded-lg">Close</button>
          <button onClick={handlePrint} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">Print (Simulate)</button>
        </div>
      </div>
    </div>
  );
};

export default PrintPreviewModal;
