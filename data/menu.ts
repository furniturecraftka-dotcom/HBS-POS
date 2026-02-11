
import type { Category, MenuItem } from '../types';

export const categories: Category[] = [
  { id: 1, name: 'Beef Kebabs', isActive: true },
  { id: 2, name: 'Chicken Kebabs', isActive: true },
  { id: 3, name: 'Beef Rolls', isActive: true },
  { id: 4, name: 'Soups', isActive: true },
  { id: 5, name: 'Biryani', isActive: true },
  { id: 6, name: 'Sides & Breads', isActive: true },
  { id: 7, name: 'Exotic', isActive: true },
  { id: 8, name: 'Beverages', isActive: true },
];

export const menuItems: MenuItem[] = [
  // Beef Kebabs
  { id: 1, name: 'Beef Seekh Kebab', categoryId: 1, price: 80, isAvailable: true },
  { id: 2, name: 'Beef Seekh Kebab (L)', categoryId: 1, price: 100, isAvailable: true },
  { id: 3, name: 'Beef Phall', categoryId: 1, price: 80, isAvailable: true },
  { id: 4, name: 'Beef Phall (L)', categoryId: 1, price: 100, isAvailable: true },
  { id: 5, name: 'Beef Shahi Kebab', categoryId: 1, price: 80, isAvailable: true },
  { id: 6, name: 'Beef Masala Kebab', categoryId: 1, price: 80, isAvailable: true },
  { id: 7, name: 'Beef Hyderabadi Kebab', categoryId: 1, price: 80, isAvailable: true },
  { id: 8, name: 'Beef Shahi Phall', categoryId: 1, price: 80, isAvailable: true },
  { id: 9, name: 'Beef Manchurian', categoryId: 1, price: 80, isAvailable: true },
  { id: 10, name: 'Beef Chinese Chilli', categoryId: 1, price: 80, isAvailable: true },
  { id: 11, name: 'Beef Veal Kebab', categoryId: 1, price: 80, isAvailable: true },
  { id: 12, name: 'Beef Patthar Phall', categoryId: 1, price: 130, isAvailable: true },
  { id: 13, name: 'Beef Kadi ki Phall', categoryId: 1, price: 100, isAvailable: true },
  
  // Chicken Kebabs
  { id: 14, name: 'Chicken Kebab (4pcs)', categoryId: 2, price: 80, isAvailable: true },
  { id: 15, name: 'Chicken Kebab (8pcs)', categoryId: 2, price: 160, isAvailable: true },
  { id: 16, name: 'Chicken Kebab (16pcs)', categoryId: 2, price: 320, isAvailable: true },
  { id: 17, name: 'Chicken Kalmi (1pc)', categoryId: 2, price: 60, isAvailable: true },
  { id: 18, name: 'Chicken Kalmi (2pcs)', categoryId: 2, price: 100, isAvailable: true },
  { id: 19, name: 'Chicken Wings (Half)', categoryId: 2, price: 100, isAvailable: true },
  { id: 20, name: 'Chicken Wings (Full)', categoryId: 2, price: 200, isAvailable: true },
  { id: 21, name: 'Chicken Tikka (Half)', categoryId: 2, price: 100, isAvailable: true },
  { id: 22, name: 'Chicken Tikka (Full)', categoryId: 2, price: 200, isAvailable: true },
  { id: 23, name: 'Chicken Malai Tikka (Half)', categoryId: 2, price: 100, isAvailable: true },
  { id: 24, name: 'Chicken Malai Tikka (Full)', categoryId: 2, price: 200, isAvailable: true },
  { id: 25, name: 'Chicken Hariyali (Half)', categoryId: 2, price: 100, isAvailable: true },
  { id: 26, name: 'Chicken Hariyali (Full)', categoryId: 2, price: 200, isAvailable: true },
  { id: 27, name: 'Chicken Alfaham (Half)', categoryId: 2, price: 200, isAvailable: true },
  { id: 28, name: 'Chicken Alfaham (Full)', categoryId: 2, price: 350, isAvailable: true },
  { id: 29, name: 'Tangdi Kebab (Red)', categoryId: 2, price: 150, isAvailable: true },
  { id: 30, name: 'Tangdi Kebab (Green)', categoryId: 2, price: 150, isAvailable: true },

  // Beef Rolls
  { id: 31, name: 'Beef Seekh Roll', categoryId: 3, price: 100, isAvailable: true },
  { id: 32, name: 'Beef Seekh Roll (Jumbo)', categoryId: 3, price: 130, isAvailable: true },
  { id: 33, name: 'Beef Seekh Roll (Mambo)', categoryId: 3, price: 180, isAvailable: true },
  { id: 34, name: 'Beef Phall Roll', categoryId: 3, price: 100, isAvailable: true },
  { id: 35, name: 'Beef Phall Roll (Jumbo)', categoryId: 3, price: 130, isAvailable: true },
  { id: 36, name: 'Beef Phall Roll (Mambo)', categoryId: 3, price: 180, isAvailable: true },
  { id: 37, name: 'Beef Shahi Kebab Roll', categoryId: 3, price: 130, isAvailable: true },
  { id: 38, name: 'Beef Shahi Kebab Roll (Jumbo)', categoryId: 3, price: 180, isAvailable: true },
  
  // Soups
  { id: 39, name: 'Plain Soup', categoryId: 4, price: 50, isAvailable: true },
  { id: 40, name: 'Nalli Soup (Bone Marrow)', categoryId: 4, price: 80, isAvailable: true },
  { id: 41, name: 'Nalli Soup (Special)', categoryId: 4, price: 100, isAvailable: true },

  // Biryani
  { id: 42, name: 'Chicken Kushka', categoryId: 5, price: 70, isAvailable: true },
  { id: 43, name: 'Chicken Biryani', categoryId: 5, price: 100, isAvailable: true },
  { id: 44, name: 'Beef Kushka', categoryId: 5, price: 70, isAvailable: true },
  { id: 45, name: 'Beef Biryani', categoryId: 5, price: 100, isAvailable: true },
  
  // Sides & Breads
  { id: 46, name: 'Rumali Roti', categoryId: 6, price: 20, isAvailable: true },
  { id: 47, name: 'Sevi (plate)', categoryId: 6, price: 20, isAvailable: true },

  // Exotic
  { id: 48, name: 'Teetar (Quail)', categoryId: 7, price: 160, isAvailable: true },
  
  // Beverages
  { id: 49, name: 'Cool Drinks', categoryId: 8, price: 20, isAvailable: true },
  { id: 50, name: 'Water Bottle', categoryId: 8, price: 10, isAvailable: true },
];
