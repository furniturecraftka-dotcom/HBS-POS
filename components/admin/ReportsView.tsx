
import React, { useMemo, useState } from 'react';
import { usePos } from '../../context/usePos';
import { OrderItem } from '../../types';

const ReportsView: React.FC = () => {
    const { getCompletedOrders, config, menuItems, categories } = usePos();
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    });

    const orders = useMemo(() => getCompletedOrders(startDate, endDate), [getCompletedOrders, startDate, endDate]);

    const totalSales = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
    const totalGst = useMemo(() => orders.reduce((sum, order) => sum + order.gstAmount, 0), [orders]);

    const itemSales = useMemo(() => {
        const sales = new Map<number, { name: string; quantity: number; total: number }>();
        orders.forEach(order => {
            order.items.forEach(item => {
                const existing = sales.get(item.menuItemId);
                if (existing) {
                    existing.quantity += item.quantity;
                    existing.total += item.lineTotal;
                } else {
                    sales.set(item.menuItemId, {
                        name: item.itemName,
                        quantity: item.quantity,
                        total: item.lineTotal
                    });
                }
            });
        });
        return Array.from(sales.values()).sort((a, b) => b.quantity - a.quantity);
    }, [orders]);

    const categorySales = useMemo(() => {
        const sales = new Map<number, { name: string; total: number }>();
        orders.forEach(order => {
            order.items.forEach(orderItem => {
                const menuItem = menuItems.find(mi => mi.id === orderItem.menuItemId);
                if (menuItem) {
                    const category = categories.find(c => c.id === menuItem.categoryId);
                    if(category) {
                         const existing = sales.get(category.id);
                         if (existing) {
                             existing.total += orderItem.lineTotal;
                         } else {
                             sales.set(category.id, { name: category.name, total: orderItem.lineTotal });
                         }
                    }
                }
            });
        });
        return Array.from(sales.values()).sort((a, b) => b.total - a.total);
    }, [orders, menuItems, categories]);


    const renderCard = (title: string, value: string) => (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-amber-400 mt-1">{value}</p>
        </div>
    );

    const renderTable = (headers: string[], data: (string|number)[][], title: string) => (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-slate-200 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-700">
                            {headers.map(h => <th key={h} className="p-2 text-slate-400 font-semibold">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="border-b border-slate-700">
                                {row.map((cell, j) => <td key={j} className="p-2">{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6">Sales Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {renderCard('Total Sales', `${config.currency}${totalSales.toFixed(2)}`)}
                {renderCard('Total Orders', orders.length.toString())}
                {renderCard('Total GST', `${config.currency}${totalGst.toFixed(2)}`)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderTable(
                    ['Item', 'Quantity Sold', 'Total Value'],
                    itemSales.map(item => [item.name, item.quantity, `${config.currency}${item.total.toFixed(2)}`]),
                    'Item-wise Sales'
                )}
                 {renderTable(
                    ['Category', 'Total Value'],
                    categorySales.map(cat => [cat.name, `${config.currency}${cat.total.toFixed(2)}`]),
                    'Category-wise Sales'
                )}
            </div>
        </div>
    );
};

export default ReportsView;
