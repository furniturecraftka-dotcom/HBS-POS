
import React from 'react';
import type { MenuItem } from '../types';
import { usePos } from '../context/usePos';

interface MenuItemGridProps {
  items: MenuItem[];
}

const MenuItemGrid: React.FC<MenuItemGridProps> = ({ items }) => {
  const { addItemToOrder, config } = usePos();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto flex-grow pr-2">
      {items.filter(item => item.isAvailable).map(item => (
        <button
          key={item.id}
          onClick={() => addItemToOrder(item.id)}
          className="bg-slate-800 rounded-lg shadow-md p-3 flex flex-col justify-between items-center text-center
                     h-32 transition-transform transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <span className="font-bold text-sm text-slate-100 flex-grow">{item.name}</span>
          <span className="text-lg font-semibold text-amber-400">{config.currency}{item.price}</span>
        </button>
      ))}
    </div>
  );
};

export default MenuItemGrid;
