
export enum Role {
  Admin = 'Admin',
  Cashier = 'Cashier',
}

export interface User {
  id: number;
  name: string;
  role: Role;
  pin: string;
  isActive: boolean;
}

export interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  isAvailable: boolean;
}

export enum OrderType {
  DineIn = 'DineIn',
  Takeaway = 'Takeaway',
}

export enum PaymentStatus {
  Unpaid = 'Unpaid',
  Paid = 'Paid',
  Hold = 'Hold',
}

export interface OrderItem {
  id: number;
  orderId: number | null;
  menuItemId: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  billNumber: string;
  orderType: OrderType;
  items: OrderItem[];
  subtotal: number;
  gstAmount: number;
  total: number;
  paymentStatus: PaymentStatus;
  createdBy: number;
  createdAt: string;
  locked: boolean;
}

export enum PaymentMethod {
  Cash = 'Cash',
  UPI = 'UPI',
  Card = 'Card',
  Split = 'Split',
}

export interface Payment {
  id: number;
  orderId: number;
  paymentMethod: PaymentMethod;
  amount: number;
}

export interface BusinessConfig {
    name: string;
    type: string;
    currency: string;
    country: string;
    gstEnabled: boolean;
    gstRate: number; // as a decimal, e.g., 0.05 for 5%
    defaultOrderType: OrderType;
    footerMessage: string;
}
