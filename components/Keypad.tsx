
import React from 'react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'Backspace'];

  const handleKeyClick = (key: string) => {
    if (key === 'C') {
      onKeyPress('Clear');
      // Special case in login screen will clear pin
      // but here we just pass it up
    } else {
      onKeyPress(key);
    }
  };

  const KeyButton: React.FC<{ keyValue: string }> = ({ keyValue }) => {
    const isSpecial = ['C', 'Backspace'].includes(keyValue);
    const wide = keyValue === '0';
    
    return (
      <button
        onClick={() => handleKeyClick(keyValue)}
        className={`
          font-bold text-2xl rounded-lg transition-transform transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400
          ${isSpecial ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-700 hover:bg-slate-600'}
          ${wide ? 'col-span-2' : ''}
          h-16
        `}
      >
        {keyValue === 'Backspace' ? '⌫' : keyValue}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.map(key => <KeyButton key={key} keyValue={key} />)}
    </div>
  );
};

export default Keypad;
