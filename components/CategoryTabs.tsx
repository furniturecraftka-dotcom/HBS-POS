
import React from 'react';
import { usePos } from '../context/usePos';

interface CategoryTabsProps {
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategoryId, onSelectCategory }) => {
  const { categories } = usePos();
  
  return (
    <div className="flex-shrink-0 mb-4">
      <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
        {categories.filter(c => c.isActive).map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`
              px-6 py-3 font-semibold rounded-lg text-sm whitespace-nowrap transition-all duration-200 shadow-sm
              transform active:scale-95
              ${selectedCategoryId === category.id 
                ? 'bg-amber-500 text-slate-900' 
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
