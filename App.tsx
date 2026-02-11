
import React from 'react';
import { usePos } from './context/usePos';
import LoginScreen from './screens/LoginScreen';
import BillingScreen from './screens/BillingScreen';
import AdminScreen from './screens/AdminScreen';

const App: React.FC = () => {
  const { currentUser } = usePos();

  const renderScreen = () => {
    if (!currentUser) {
      return <LoginScreen />;
    }

    if (currentUser.role === 'Admin') {
      return <AdminScreen />;
    }
    
    return <BillingScreen />;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-900 font-sans">
      {renderScreen()}
    </div>
  );
};

export default App;
