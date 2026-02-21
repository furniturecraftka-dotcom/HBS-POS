
import React, { useState } from 'react';
import { usePos } from '../context/usePos';
import CategoryTabs from '../components/CategoryTabs';
import MenuItemGrid from '../components/MenuItemGrid';
import OrderSummary from '../components/OrderSummary';
import { UserIcon } from '../components/icons';

const BillingScreen: React.FC = () => {
  const { menuItems, categories, currentUser, logout } = usePos();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0]?.id || 0);

  const filteredMenuItems = menuItems.filter(item => item.categoryId === selectedCategoryId);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900">
      <header className="flex items-center justify-between p-3 bg-slate-800 shadow-md flex-shrink-0">
        <h1 className="text-2xl font-bold text-amber-400">H.B.S. Kabab POS</h1>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
                <UserIcon className="w-6 h-6" />
                <span className="font-medium">{currentUser?.name}</span>
            </div>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95">
                Logout
            </button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        <div className="w-full md:w-3/5 xl:w-2/3 flex flex-col p-4 overflow-y-auto order-2 md:order-1 h-1/2 md:h-auto">
          <CategoryTabs 
            selectedCategoryId={selectedCategoryId} 
            onSelectCategory={setSelectedCategoryId}
          />
          <MenuItemGrid items={filteredMenuItems} />
        </div>
        <div className="w-full md:w-2/5 xl:w-1/3 bg-slate-800 p-4 flex flex-col shadow-lg order-1 md:order-2 h-1/2 md:h-auto border-b md:border-b-0 border-slate-700 z-10">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default BillingScreen;
