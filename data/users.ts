
import { User, Role } from '../types';

export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    role: Role.Admin,
    pin: '1234',
    isActive: true,
  },
  {
    id: 2,
    name: 'Cashier 1',
    role: Role.Cashier,
    pin: '0001',
    isActive: true,
  },
  {
    id: 3,
    name: 'Cashier 2',
    role: Role.Cashier,
    pin: '0002',
    isActive: true,
  },
    {
    id: 4,
    name: 'Inactive Cashier',
    role: Role.Cashier,
    pin: '0003',
    isActive: false,
  },
];
