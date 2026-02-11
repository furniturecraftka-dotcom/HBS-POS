
import React, { useState } from 'react';
import { usePos } from '../context/usePos';
import Keypad from '../components/Keypad';

const LoginScreen: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const { login } = usePos();

  const handlePinChange = (newPin: string) => {
    setError('');
    setPin(newPin);
  };
  
  const handleLogin = () => {
    if (login(pin)) {
        // success, App component will switch screen
    } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === 'Enter') {
        handleLogin();
        return;
    }
    if (key === 'Backspace') {
        handlePinChange(pin.slice(0, -1));
        return;
    }
    if (pin.length < 4 && '0123456789'.includes(key)) {
        handlePinChange(pin + key);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <div className="w-full max-w-xs p-8 bg-slate-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-amber-400 mb-2">H.B.S. Kabab POS</h1>
        <p className="text-center text-slate-400 mb-6">Enter your PIN to login</p>
        
        <div className="flex justify-center items-center space-x-3 mb-6 h-12">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className={`w-6 h-6 rounded-full transition-colors duration-200 ${pin.length > i ? 'bg-amber-400' : 'bg-slate-600'}`}></div>
          ))}
        </div>

        {error && <p className="text-red-400 text-center text-sm mb-4 h-5">{error}</p>}
        
        <Keypad onKeyPress={handleKeyPress} />

        <button 
          onClick={handleLogin}
          className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-4 rounded-lg transition-transform transform active:scale-95 text-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
