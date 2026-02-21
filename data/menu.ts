
import type { Category, MenuItem } from '../types';

export const categories: Category[] = [
  { id: 1, name: 'Signature Rolls', isActive: true },
  { id: 2, name: 'Beef Specialties', isActive: true },
  { id: 3, name: 'Chicken & Specialized Poultry', isActive: true },
  { id: 4, name: 'Rice & Sides', isActive: true },
  { id: 5, name: 'Soups & Drinks', isActive: true },
  { id: 6, name: 'Special Combo Meals', isActive: true },
  { id: 7, name: 'Premium Platters', isActive: true },
];

export const menuItems: MenuItem[] = [
  // Signature Rolls
  { id: 101, name: 'Beef Seekh Roll (Regular)', categoryId: 1, price: 100, isAvailable: true },
  { id: 102, name: 'Beef Seekh Roll (Jumbo)', categoryId: 1, price: 130, isAvailable: true },
  { id: 103, name: 'Beef Seekh Roll (Mambo)', categoryId: 1, price: 180, isAvailable: true },
  { id: 104, name: 'Beef Phall Roll (Regular)', categoryId: 1, price: 100, isAvailable: true },
  { id: 105, name: 'Beef Phall Roll (Jumbo)', categoryId: 1, price: 130, isAvailable: true },
  { id: 106, name: 'Beef Phall Roll (Mambo)', categoryId: 1, price: 180, isAvailable: true },
  { id: 107, name: 'Beef Shahi Kebab Roll (Regular)', categoryId: 1, price: 130, isAvailable: true },
  { id: 108, name: 'Beef Shahi Kebab Roll (Jumbo)', categoryId: 1, price: 180, isAvailable: true },
  { id: 109, name: 'Beef Hyderabadi Roll (Regular)', categoryId: 1, price: 130, isAvailable: true },
  { id: 110, name: 'Beef Hyderabadi Roll (Jumbo)', categoryId: 1, price: 180, isAvailable: true },
  { id: 111, name: 'Beef Shahi Phall Roll (Regular)', categoryId: 1, price: 130, isAvailable: true },
  { id: 112, name: 'Beef Shahi Phall Roll (Jumbo)', categoryId: 1, price: 180, isAvailable: true },
  { id: 113, name: 'Beef Veal Roll (Regular)', categoryId: 1, price: 130, isAvailable: true },
  { id: 114, name: 'Beef Veal Roll (Jumbo)', categoryId: 1, price: 180, isAvailable: true },
  { id: 115, name: 'Beef Arabian Roll (Jumbo)', categoryId: 1, price: 180, isAvailable: true },

  // Beef Specialties
  { id: 201, name: 'Beef Seekh Kebab (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 202, name: 'Beef Seekh Kebab (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 203, name: 'Beef Shahi Kebab (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 204, name: 'Beef Shahi Kebab (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 205, name: 'Beef Masala Kebab (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 206, name: 'Beef Masala Kebab (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 207, name: 'Beef Hyderabadi Kebab (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 208, name: 'Beef Hyderabadi Kebab (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 209, name: 'Beef Shahi Phall (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 210, name: 'Beef Shahi Phall (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 211, name: 'Beef Manchurian (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 212, name: 'Beef Manchurian (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 213, name: 'Beef Chinese Chilli Kebab (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 214, name: 'Beef Chinese Chilli Kebab (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 215, name: 'Beef Veal Kebab (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 216, name: 'Beef Veal Kebab (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 217, name: 'Beef Grilled Chops (Phall) (Regular)', categoryId: 2, price: 80, isAvailable: true },
  { id: 218, name: 'Beef Grilled Chops (Phall) (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 219, name: 'Beef Kadi ki Phall (Large)', categoryId: 2, price: 100, isAvailable: true },
  { id: 220, name: 'Beef Patthar Phall (Large)', categoryId: 2, price: 130, isAvailable: true },

  // Chicken & Specialized Poultry
  { id: 301, name: 'Chicken Kebab (4pcs)', categoryId: 3, price: 80, isAvailable: true },
  { id: 302, name: 'Chicken Kebab (8pcs)', categoryId: 3, price: 160, isAvailable: true },
  { id: 303, name: 'Chicken Kebab (16pcs)', categoryId: 3, price: 320, isAvailable: true },
  { id: 304, name: 'Chicken Kalmi (Leg) (1pc)', categoryId: 3, price: 60, isAvailable: true },
  { id: 305, name: 'Chicken Kalmi (Leg) (2pcs)', categoryId: 3, price: 100, isAvailable: true },
  { id: 306, name: 'Chicken Wings (4pcs)', categoryId: 3, price: 100, isAvailable: true },
  { id: 307, name: 'Chicken Wings (8pcs)', categoryId: 3, price: 200, isAvailable: true },
  { id: 308, name: 'Chicken Tikka (4pcs)', categoryId: 3, price: 100, isAvailable: true },
  { id: 309, name: 'Chicken Tikka (8pcs)', categoryId: 3, price: 200, isAvailable: true },
  { id: 310, name: 'Chicken Malai Tikka (4pcs)', categoryId: 3, price: 100, isAvailable: true },
  { id: 311, name: 'Chicken Malai Tikka (8pcs)', categoryId: 3, price: 200, isAvailable: true },
  { id: 312, name: 'Chicken Hariyali Tikka (4pcs)', categoryId: 3, price: 100, isAvailable: true },
  { id: 313, name: 'Chicken Hariyali Tikka (8pcs)', categoryId: 3, price: 200, isAvailable: true },
  { id: 314, name: 'Tangdi Kebab (Red) (1pc)', categoryId: 3, price: 150, isAvailable: true },
  { id: 315, name: 'Tangdi Kebab (Green) (1pc)', categoryId: 3, price: 150, isAvailable: true },
  { id: 316, name: 'Chicken Alfaham (Half)', categoryId: 3, price: 200, isAvailable: true },
  { id: 317, name: 'Chicken Alfaham (Full)', categoryId: 3, price: 350, isAvailable: true },
  { id: 318, name: 'Teetar (Quail) (1 Single)', categoryId: 3, price: 160, isAvailable: true },

  // Rice & Sides
  { id: 401, name: 'Chicken Biryani', categoryId: 4, price: 100, isAvailable: true },
  { id: 402, name: 'Beef Biryani', categoryId: 4, price: 100, isAvailable: true },
  { id: 403, name: 'Chicken Kushka', categoryId: 4, price: 70, isAvailable: true },
  { id: 404, name: 'Beef Kushka', categoryId: 4, price: 70, isAvailable: true },
  { id: 405, name: 'Rumali Roti', categoryId: 4, price: 20, isAvailable: true },
  { id: 406, name: 'Sevi (Dessert)', categoryId: 4, price: 20, isAvailable: true },

  // Soups & Drinks
  { id: 501, name: 'Bone Marrow (Nalli) Soup (Regular)', categoryId: 5, price: 80, isAvailable: true },
  { id: 502, name: 'Bone Marrow (Nalli) Soup (Large)', categoryId: 5, price: 100, isAvailable: true },
  { id: 503, name: 'Plain Soup', categoryId: 5, price: 50, isAvailable: true },
  { id: 504, name: 'Cool Drinks', categoryId: 5, price: 20, isAvailable: true },
  { id: 505, name: 'Water Bottle', categoryId: 5, price: 10, isAvailable: true },

  // Special Combo Meals
  { id: 601, name: 'Student Combo', description: 'Beef Seekh Kebab (Regular) + 1 Rumali Roti + Water Bottle', categoryId: 6, price: 100, isAvailable: true },
  { id: 602, name: 'The Biryani Deal', description: '1 Plate Chicken or Beef Biryani + 1 Glass Cool Drink', categoryId: 6, price: 100, isAvailable: true },
  { id: 603, name: 'The Quick Roll', description: '1 Beef Phall Roll (Regular) + Water Bottle', categoryId: 6, price: 100, isAvailable: true },
  { id: 604, name: 'Kebab & Roti Feast', description: 'Any ₹100 Beef Kebab + 2 Rumali Rotis + Water Bottle', categoryId: 6, price: 150, isAvailable: true },
  { id: 605, name: 'Chicken Tikka Meal', description: 'Chicken Tikka (4pcs) + 1 Rumali Roti + Cool Drink', categoryId: 6, price: 150, isAvailable: true },
  { id: 606, name: 'Soup & Starter', description: 'Bone Marrow (Nalli) Soup + Beef Seekh Kebab', categoryId: 6, price: 150, isAvailable: true },

  // Premium Platters
  { id: 701, name: 'The Jumbo Roll Combo', description: '1 Beef Shahi/Veal/Hyderabadi Jumbo Roll + Cool Drink + Sevi Dessert', categoryId: 7, price: 200, isAvailable: true },
  { id: 702, name: 'Leg Kebab Platter', description: '2pcs Chicken Kalmi + 2 Rumali Rotis + Cool Drink', categoryId: 7, price: 200, isAvailable: true },
  { id: 703, name: 'Mix Beef Platter', description: 'Beef Seekh (Regular) + Beef Shahi (Regular) + 2 Rumali Rotis', categoryId: 7, price: 200, isAvailable: true },
  { id: 704, name: 'The Family Mix', description: '8pcs Chicken Kebab + 8pcs Chicken Wings + 4 Rumali Rotis + 2 Cool Drinks', categoryId: 7, price: 500, isAvailable: true },
  { id: 705, name: 'The Full Alfaham Feast', description: '1 Full Chicken Alfaham + 4 Rumali Rotis + 2 Cool Drinks', categoryId: 7, price: 500, isAvailable: true },
];
