
import React, { useState } from 'react';
import type { Order } from '../types';
import { PaymentMethod } from '../types';
import { usePos } from '../context/usePos';

interface PaymentModalProps {
  order: Order;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ order, onClose, onPaymentSuccess }) => {
  const { config } = usePos();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Cash);
  const [amountPaid, setAmountPaid] = useState(order.total);
  const [change, setChange] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setAmountPaid(value);
      if (paymentMethod === PaymentMethod.Cash && value >= order.total) {
          setChange(value - order.total);
      } else {
          setChange(0);
      }
  };
  
  const handlePayment = () => {
      // In a real app, this would process the payment.
      // For this simulation, we'll just confirm it.
      if (amountPaid >= order.total) {
          onPaymentSuccess();
      } else {
          alert("Amount paid is less than total amount.");
      }
  };

  const quickCashAmounts = [order.total, Math.ceil(order.total/10)*10, Math.ceil(order.total/50)*50, Math.ceil(order.total/100)*100].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-lg text-white" onClick={e => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-center mb-2">Payment</h2>
        <p className="text-5xl font-mono text-center mb-6 text-amber-400">{config.currency}{order.total.toFixed(2)}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {(Object.values(PaymentMethod) as PaymentMethod[]).filter(m => m !== PaymentMethod.Split).map(method => (
            <button key={method} onClick={() => setPaymentMethod(method)} className={`py-3 rounded-lg font-semibold transition-colors ${paymentMethod === method ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 hover:bg-slate-600'}`}>{method}</button>
          ))}
        </div>

        {paymentMethod === PaymentMethod.Cash && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Cash Received</label>
            <input 
              type="number"
              value={amountPaid}
              onChange={handleAmountChange}
              className="w-full bg-slate-900 p-3 rounded-lg text-2xl text-center font-mono"
              autoFocus
            />
            <div className="flex gap-2 mt-2">
                {quickCashAmounts.map(amount => (
                    <button key={amount} onClick={() => { setAmountPaid(amount); setChange(amount - order.total); }} className="flex-1 bg-slate-700 p-2 rounded text-sm hover:bg-slate-600">{config.currency}{amount}</button>
                ))}
            </div>
            {change > 0 && <p className="text-center mt-4 text-xl">Change Due: <span className="font-bold text-green-400">{config.currency}{change.toFixed(2)}</span></p>}
          </div>
        )}

        <div className="flex gap-4 mt-8">
            <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg text-lg">Cancel</button>
            <button onClick={handlePayment} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-lg">Confirm Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
