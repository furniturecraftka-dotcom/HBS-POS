import React, { useState, useEffect } from 'react';
import { usePos } from '../../context/usePos';
import { MenuItem, Category } from '../../types';
import { PlusIcon, TrashIcon, PencilIcon, XIcon, CheckIcon } from '../icons';

const MenuManagementView: React.FC = () => {
    const { categories, menuItems, addCategory, updateCategory, deleteCategory, addMenuItem, updateMenuItem, deleteMenuItem } = usePos();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isAddingItem, setIsAddingItem] = useState(false);

    // Form states
    const [categoryFormName, setCategoryFormName] = useState('');
    const [itemFormName, setItemFormName] = useState('');
    const [itemFormShortName, setItemFormShortName] = useState('');
    const [itemFormDescription, setItemFormDescription] = useState('');
    const [itemFormPrice, setItemFormPrice] = useState('');
    const [itemFormIsAvailable, setItemFormIsAvailable] = useState(true);

    useEffect(() => {
        if (categories.length > 0 && selectedCategoryId === null) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [categories, selectedCategoryId]);

    const handleCategoryClick = (id: number) => {
        setSelectedCategoryId(id);
        setIsAddingItem(false);
        setEditingItem(null);
    };

    const handleAddCategory = () => {
        if (categoryFormName.trim()) {
            addCategory({ name: categoryFormName, isActive: true });
            setCategoryFormName('');
            setIsAddingCategory(false);
        }
    };

    const handleUpdateCategory = () => {
        if (editingCategory && categoryFormName.trim()) {
            updateCategory({ ...editingCategory, name: categoryFormName });
            setEditingCategory(null);
            setCategoryFormName('');
        }
    };

    const handleDeleteCategory = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category? All items in it will also be deleted.')) {
            // In a real app, we should probably check for dependencies or cascade delete.
            // For now, we'll just delete the category. The items will be orphaned or we should delete them too.
            // Let's delete items associated with this category for consistency.
            const itemsToDelete = menuItems.filter(item => item.categoryId === id);
            itemsToDelete.forEach(item => deleteMenuItem(item.id));
            deleteCategory(id);
            if (selectedCategoryId === id) {
                setSelectedCategoryId(null);
            }
        }
    };

    const handleAddItem = () => {
        if (selectedCategoryId && itemFormName.trim() && itemFormPrice) {
            addMenuItem({
                name: itemFormName,
                shortName: itemFormShortName,
                description: itemFormDescription,
                categoryId: selectedCategoryId,
                price: parseFloat(itemFormPrice),
                isAvailable: itemFormIsAvailable
            });
            resetItemForm();
        }
    };

    const handleUpdateItem = () => {
        if (editingItem && itemFormName.trim() && itemFormPrice) {
            updateMenuItem({
                ...editingItem,
                name: itemFormName,
                shortName: itemFormShortName,
                description: itemFormDescription,
                price: parseFloat(itemFormPrice),
                isAvailable: itemFormIsAvailable
            });
            setEditingItem(null);
            resetItemForm();
        }
    };

    const handleDeleteItem = (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteMenuItem(id);
        }
    };

    const resetItemForm = () => {
        setItemFormName('');
        setItemFormShortName('');
        setItemFormDescription('');
        setItemFormPrice('');
        setItemFormIsAvailable(true);
        setIsAddingItem(false);
        setEditingItem(null);
    };

    const startEditingCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryFormName(category.name);
        setIsAddingCategory(false);
    };

    const startEditingItem = (item: MenuItem) => {
        setEditingItem(item);
        setItemFormName(item.name);
        setItemFormShortName(item.shortName || '');
        setItemFormDescription(item.description || '');
        setItemFormPrice(item.price.toString());
        setItemFormIsAvailable(item.isAvailable);
        setIsAddingItem(false);
    };

    const filteredItems = selectedCategoryId ? menuItems.filter(item => item.categoryId === selectedCategoryId) : [];

    return (
        <div className="flex h-full gap-6">
            {/* Categories Sidebar */}
            <div className="w-1/3 bg-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-amber-400">Categories</h2>
                    <button 
                        onClick={() => { setIsAddingCategory(true); setEditingCategory(null); setCategoryFormName(''); }}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>

                {isAddingCategory && (
                    <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                        <input
                            type="text"
                            value={categoryFormName}
                            onChange={(e) => setCategoryFormName(e.target.value)}
                            placeholder="Category Name"
                            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 mb-2 focus:outline-none focus:border-amber-500"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsAddingCategory(false)} className="p-1 text-slate-400 hover:text-slate-200"><XIcon className="w-5 h-5" /></button>
                            <button onClick={handleAddCategory} className="p-1 text-green-400 hover:text-green-300"><CheckIcon className="w-5 h-5" /></button>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    {categories.map(category => (
                        <div 
                            key={category.id}
                            className={`group p-3 rounded-lg flex justify-between items-center cursor-pointer transition-colors ${selectedCategoryId === category.id ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-slate-700/50 hover:bg-slate-700'}`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {editingCategory?.id === category.id ? (
                                <div className="flex-1 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="text"
                                        value={categoryFormName}
                                        onChange={(e) => setCategoryFormName(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-500"
                                        autoFocus
                                    />
                                    <button onClick={handleUpdateCategory} className="text-green-400 hover:text-green-300"><CheckIcon className="w-5 h-5" /></button>
                                    <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-200"><XIcon className="w-5 h-5" /></button>
                                </div>
                            ) : (
                                <>
                                    <span className={`font-medium ${selectedCategoryId === category.id ? 'text-amber-400' : 'text-slate-200'}`}>{category.name}</span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); startEditingCategory(category); }}
                                            className="text-slate-400 hover:text-amber-400"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}
                                            className="text-slate-400 hover:text-red-400"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Items List */}
            <div className="flex-1 bg-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-amber-400">
                        {selectedCategoryId ? categories.find(c => c.id === selectedCategoryId)?.name : 'Select a Category'} Items
                    </h2>
                    {selectedCategoryId && (
                        <button 
                            onClick={() => { setIsAddingItem(true); setEditingItem(null); resetItemForm(); }}
                            className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-slate-900 font-bold transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Add Item</span>
                        </button>
                    )}
                </div>

                {(isAddingItem || editingItem) && (
                    <div className="mb-6 p-4 bg-slate-700 rounded-xl border border-slate-600">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">{editingItem ? 'Edit Item' : 'New Item'}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={itemFormName}
                                    onChange={(e) => setItemFormName(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Short Name (for Receipt)</label>
                                <input
                                    type="text"
                                    value={itemFormShortName}
                                    onChange={(e) => setItemFormShortName(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    value={itemFormPrice}
                                    onChange={(e) => setItemFormPrice(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs text-slate-400 mb-1">Description (Optional)</label>
                                <input
                                    type="text"
                                    value={itemFormDescription}
                                    onChange={(e) => setItemFormDescription(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isAvailable"
                                    checked={itemFormIsAvailable}
                                    onChange={(e) => setItemFormIsAvailable(e.target.checked)}
                                    className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500"
                                />
                                <label htmlFor="isAvailable" className="text-slate-300">Available for sale</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={resetItemForm}
                                className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={editingItem ? handleUpdateItem : handleAddItem}
                                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg"
                            >
                                {editingItem ? 'Update Item' : 'Save Item'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto">
                    {selectedCategoryId ? (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-700/50 text-slate-400 text-sm sticky top-0">
                                <tr>
                                    <th className="p-3 rounded-tl-lg">Name</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 rounded-tr-lg text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500">
                                            No items in this category. Add one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredItems.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-700/30 transition-colors group">
                                            <td className="p-3 font-medium text-slate-200">{item.name}</td>
                                            <td className="p-3 text-slate-400 text-sm">{item.description || '-'}</td>
                                            <td className="p-3 text-amber-400 font-mono">₹{item.price}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.isAvailable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {item.isAvailable ? 'Active' : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => startEditingItem(item)}
                                                        className="p-1 text-slate-400 hover:text-amber-400 bg-slate-800 rounded hover:bg-slate-700"
                                                    >
                                                        <PencilIcon className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteItem(item.id)}
                                                        className="p-1 text-slate-400 hover:text-red-400 bg-slate-800 rounded hover:bg-slate-700"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                            <p>Select a category to view items</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuManagementView;
