import React, { createContext, useState, useCallback, ReactNode } from 'react';
// Fix: Enums like PaymentStatus are used as values at runtime and must be imported as values, not just types.
import type { User, Order, OrderItem, MenuItem, BusinessConfig } from '../types';
import { users as mockUsers } from '../data/users';
import { menuItems as mockMenuItems, categories as mockCategories } from '../data/menu';
import { Role, OrderType, PaymentStatus } from '../types';

interface PosContextType {
  currentUser: User | null;
  login: (pin: string) => User | null;
  logout: () => void;
  users: User[];
  menuItems: MenuItem[];
  categories: typeof mockCategories;
  activeOrder: Order | null;
  startNewOrder: () => void;
  addItemToOrder: (itemId: number) => void;
  updateItemQuantity: (menuItemId: number, quantity: number) => void;
  removeItemFromOrder: (menuItemId: number) => void;
  updateOrderStatus: (status: PaymentStatus) => void;
  getHeldOrders: () => Order[];
  resumeOrder: (orderId: number) => void;
  config: BusinessConfig;
  toggleGst: () => void;
  getCompletedOrders: (startDate?: Date, endDate?: Date) => Order[];
}

export const PosContext = createContext<PosContextType | undefined>(undefined);

let orderIdCounter = 1;
let billNumberCounter = 1;

const createInitialOrder = (userId: number, config: BusinessConfig): Order => {
    const now = new Date();
    const billNumber = `B${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${billNumberCounter.toString().padStart(4, '0')}`;
    billNumberCounter++;
    return {
        id: orderIdCounter++,
        billNumber,
        orderType: config.defaultOrderType,
        items: [],
        subtotal: 0,
        gstAmount: 0,
        total: 0,
        paymentStatus: PaymentStatus.Unpaid,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        locked: false,
    };
};

export const PosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [config, setConfig] = useState<BusinessConfig>({
      name: 'H.B.S Coles Park Standard Kabab Corner',
      type: 'Quick Service Restaurant (QSR)',
      currency: '₹',
      country: 'India',
      gstEnabled: true,
      gstRate: 0.05, // 5%
      defaultOrderType: OrderType.Takeaway,
      footerMessage: "Thank you for visiting. Made with love ❤️",
  });
  
  const calculateTotals = useCallback((items: OrderItem[]): Pick<Order, 'subtotal' | 'gstAmount' | 'total'> => {
      const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
      const gstAmount = config.gstEnabled ? subtotal * config.gstRate : 0;
      const total = subtotal + gstAmount;
      return { subtotal, gstAmount, total };
  }, [config.gstEnabled, config.gstRate]);

  const login = (pin: string): User | null => {
    const user = mockUsers.find(u => u.pin === pin && u.isActive);
    if (user) {
      setCurrentUser(user);
      if (user.role === Role.Cashier) {
          startNewOrderForUser(user.id);
      }
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveOrder(null);
  };

  const startNewOrderForUser = (userId: number) => {
    const newOrder = createInitialOrder(userId, config);
    setActiveOrder(newOrder);
  };

  const startNewOrder = () => {
      if (!currentUser) return;
      if (activeOrder && activeOrder.items.length > 0 && activeOrder.paymentStatus !== PaymentStatus.Paid) {
          // This would be where you might prompt to save/hold the current order
          console.log("Current order is not empty. Finish or hold it first.");
      }
      startNewOrderForUser(currentUser.id);
  };

  const addItemToOrder = (itemId: number) => {
    if (!activeOrder || activeOrder.locked) return;

    const itemToAdd = mockMenuItems.find(i => i.id === itemId);
    if (!itemToAdd) return;

    const existingItem = activeOrder.items.find(i => i.menuItemId === itemId);

    let newItems: OrderItem[];
    if (existingItem) {
      newItems = activeOrder.items.map(item =>
        item.menuItemId === itemId ? { ...item, quantity: item.quantity + 1, lineTotal: (item.quantity + 1) * item.unitPrice } : item
      );
    } else {
      const newOrderItem: OrderItem = {
        id: Date.now(),
        orderId: activeOrder.id,
        menuItemId: itemToAdd.id,
        itemName: itemToAdd.name,
        quantity: 1,
        unitPrice: itemToAdd.price,
        lineTotal: itemToAdd.price,
      };
      newItems = [...activeOrder.items, newOrderItem];
    }
    
    const totals = calculateTotals(newItems);
    setActiveOrder({ ...activeOrder, items: newItems, ...totals });
  };
  
  const updateItemQuantity = (menuItemId: number, quantity: number) => {
      if (!activeOrder || activeOrder.locked) return;
      
      let newItems: OrderItem[];
      if(quantity <= 0) {
          newItems = activeOrder.items.filter(item => item.menuItemId !== menuItemId);
      } else {
          newItems = activeOrder.items.map(item =>
              item.menuItemId === menuItemId ? { ...item, quantity, lineTotal: quantity * item.unitPrice } : item
          );
      }

      const totals = calculateTotals(newItems);
      setActiveOrder({ ...activeOrder, items: newItems, ...totals });
  };

  const removeItemFromOrder = (menuItemId: number) => {
      updateItemQuantity(menuItemId, 0);
  };

  const updateOrderStatus = (status: PaymentStatus) => {
    if (!activeOrder) return;
    const isFinalized = status === PaymentStatus.Paid;
    const updatedOrder = { ...activeOrder, paymentStatus: status, locked: isFinalized };
    
    // Add to history if it's being finalized or put on hold
    if (isFinalized || status === PaymentStatus.Hold) {
        setOrderHistory(prev => [...prev.filter(o => o.id !== updatedOrder.id), updatedOrder]);
        if (currentUser) {
            startNewOrderForUser(currentUser.id);
        } else {
            setActiveOrder(null);
        }
    } else {
        setActiveOrder(updatedOrder);
    }
  };
  
  const getHeldOrders = () => {
      return orderHistory.filter(o => o.paymentStatus === PaymentStatus.Hold);
  };
  
  const resumeOrder = (orderId: number) => {
      const orderToResume = orderHistory.find(o => o.id === orderId && o.paymentStatus === PaymentStatus.Hold);
      if(orderToResume) {
          // In a real system, you'd check if another cashier has it locked.
          setActiveOrder({...orderToResume, paymentStatus: PaymentStatus.Unpaid, locked: false});
          setOrderHistory(prev => prev.filter(o => o.id !== orderId));
      }
  };

  const toggleGst = () => {
      setConfig(prev => ({...prev, gstEnabled: !prev.gstEnabled}));
  }

  const getCompletedOrders = (startDate?: Date, endDate?: Date) => {
      return orderHistory.filter(o => {
          const isPaid = o.paymentStatus === PaymentStatus.Paid;
          if (!isPaid) return false;
          
          const orderDate = new Date(o.createdAt);
          if (startDate && orderDate < startDate) return false;
          if (endDate && orderDate > endDate) return false;
          
          return true;
      });
  };

  const value = {
    currentUser,
    login,
    logout,
    users: mockUsers,
    menuItems: mockMenuItems,
    categories: mockCategories,
    activeOrder,
    startNewOrder,
    addItemToOrder,
    updateItemQuantity,
    removeItemFromOrder,
    updateOrderStatus,
    getHeldOrders,
    resumeOrder,
    config,
    toggleGst,
    getCompletedOrders,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};