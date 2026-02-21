
import React, { useState } from 'react';
import { usePos } from '../context/usePos';
import { MinusIcon, PlusIcon, TrashIcon } from './icons';
import { PaymentStatus } from '../types';
import PaymentModal from './PaymentModal';
import PrintPreviewModal from './PrintPreviewModal';
import { generateKOT, generateReceipt } from '../utils/escpos';

const OrderSummary: React.FC = () => {
  const { activeOrder, updateItemQuantity, config, updateOrderStatus, startNewOrder, getHeldOrders, resumeOrder, toggleGst } = usePos();
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [showHeldOrders, setShowHeldOrders] = useState(false);
  const [printData, setPrintData] = useState<{ title: string, content: string, order?: any } | null>(null);

  const heldOrders = getHeldOrders();

  const handlePrintKOT = () => {
    if (activeOrder && activeOrder.items.length > 0) {
        const kotContent = generateKOT(activeOrder);
        setPrintData({ title: "Kitchen Order Ticket (KOT)", content: kotContent, order: activeOrder });
    }
  };

  const handlePaymentSuccess = () => {
    if(activeOrder) {
        const receiptContent = generateReceipt(activeOrder, config);
        setPrintData({ title: "Receipt", content: receiptContent, order: activeOrder });
        updateOrderStatus(PaymentStatus.Paid);
    }
    setPaymentModalOpen(false);
  };

  const handleQuickCash = () => {
      if(activeOrder && activeOrder.items.length > 0) {
          // Assume exact cash payment
          const receiptContent = generateReceipt(activeOrder, config);
          setPrintData({ title: "Receipt", content: receiptContent, order: activeOrder });
          updateOrderStatus(PaymentStatus.Paid);
      }
  };
  
  if (!activeOrder) return <div className="text-center text-slate-400">No active order.</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold text-slate-200">Current Order</h2>
          <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">GST</span>
              <button 
                  onClick={toggleGst}
                  className={`w-10 h-5 rounded-full flex items-center transition-colors ${config.gstEnabled ? 'bg-amber-500' : 'bg-slate-600'}`}
              >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${config.gstEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
          </div>
      </div>
      <p className="text-sm text-slate-400 mb-4">{activeOrder.billNumber}</p>
      
      <div className="flex-grow overflow-y-auto -mr-4 pr-4 border-t border-b border-slate-700 py-2">
        {activeOrder.items.length === 0 ? (
          <p className="text-slate-500 text-center py-10">Tap an item to start an order.</p>
        ) : (
          <ul className="divide-y divide-slate-700">
            {activeOrder.items.map(item => (
              <li key={item.menuItemId} className="py-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200 w-2/4 truncate">{item.itemName}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateItemQuantity(item.menuItemId, item.quantity - 1)} className="p-1 rounded-full bg-slate-600 hover:bg-slate-500"><MinusIcon className="w-4 h-4" /></button>
                    <span className="w-8 text-center font-mono">{item.quantity}</span>
                    <button onClick={() => updateItemQuantity(item.menuItemId, item.quantity + 1)} className="p-1 rounded-full bg-slate-600 hover:bg-slate-500"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  <span className="font-semibold w-1/5 text-right">{config.currency}{item.lineTotal.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 flex-shrink-0">
        <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>{config.currency}{activeOrder.subtotal.toFixed(2)}</span></div>
            {config.gstEnabled && <div className="flex justify-between text-slate-400"><span>GST ({config.gstRate * 100}%)</span><span>{config.currency}{activeOrder.gstAmount.toFixed(2)}</span></div>}
            <div className="flex justify-between font-bold text-2xl pt-2 border-t border-slate-700 mt-2 text-amber-400"><span>Total</span><span>{config.currency}{activeOrder.total.toFixed(2)}</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={startNewOrder} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg">New Bill</button>
            <button onClick={handlePrintKOT} disabled={activeOrder.items.length === 0} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg disabled:bg-slate-700 disabled:text-slate-500">Print KOT</button>
            <button onClick={() => updateOrderStatus(PaymentStatus.Hold)} disabled={activeOrder.items.length === 0} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg disabled:bg-slate-700 disabled:text-slate-500">Hold Bill</button>
            <button onClick={() => setShowHeldOrders(true)} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg relative">
                On Hold
                {heldOrders.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{heldOrders.length}</span>}
            </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
            <button onClick={handleQuickCash} disabled={activeOrder.items.length === 0} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg text-lg disabled:bg-slate-700 disabled:text-slate-500">
                Quick Cash
            </button>
            <button onClick={() => setPaymentModalOpen(true)} disabled={activeOrder.items.length === 0} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg disabled:bg-slate-700 disabled:text-slate-500">
                Pay
            </button>
        </div>
      </div>

      {isPaymentModalOpen && <PaymentModal order={activeOrder} onClose={() => setPaymentModalOpen(false)} onPaymentSuccess={handlePaymentSuccess} />}
      {printData && <PrintPreviewModal title={printData.title} content={printData.content} order={printData.order} onClose={() => setPrintData(null)} />}
      
      {showHeldOrders && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30" onClick={() => setShowHeldOrders(false)}>
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">Held Orders</h3>
                {heldOrders.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {heldOrders.map(order => (
                            <button key={order.id} onClick={() => { resumeOrder(order.id); setShowHeldOrders(false); }} className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg">
                                <div className="flex justify-between">
                                    <span>{order.billNumber}</span>
                                    <span className="font-semibold">{config.currency}{order.total.toFixed(2)}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : <p className="text-slate-400">No orders on hold.</p>}
            </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
