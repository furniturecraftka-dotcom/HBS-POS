
import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4 border-b border-slate-700 pb-2">{title}</h3>
        <div className="prose prose-invert max-w-none text-slate-300">{children}</div>
    </div>
);

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
    <pre className="bg-slate-900 p-4 rounded-md text-sm overflow-x-auto">
        <code>{children.trim()}</code>
    </pre>
);

const SystemInfoView: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6">System Architecture & Documentation</h2>
            
            <Section title="Recommended Tech Stack">
                <ul>
                    <li><strong>Frontend:</strong> React with TypeScript (as implemented), packaged with Electron for cross-platform desktop support and access to native features like printing.</li>
                    <li><strong>Backend:</strong> Node.js with Express.js or Fastify. It's lightweight, fast, and well-suited for handling local network API requests.</li>
                    <li><strong>Database:</strong> SQLite. It's serverless, file-based, and perfect for a local, offline-first application. For higher concurrency, PostgreSQL is a robust alternative.</li>
                    <li><strong>Printing:</strong> A Node.js library like <code>node-thermal-printer</code> or <code>escpos</code> to communicate with USB or Bluetooth thermal printers from the backend.</li>
                </ul>
            </Section>

            <Section title="Database Schema (SQL Format)">
                <CodeBlock>{`
-- Users Table
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT CHECK(role IN ('Admin', 'Cashier')) NOT NULL,
    pin TEXT NOT NULL UNIQUE,
    isActive BOOLEAN NOT NULL DEFAULT 1
);

-- Categories Table
CREATE TABLE Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    isActive BOOLEAN NOT NULL DEFAULT 1
);

-- MenuItems Table
CREATE TABLE MenuItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    categoryId INTEGER NOT NULL,
    price REAL NOT NULL,
    isAvailable BOOLEAN NOT NULL DEFAULT 1,
    FOREIGN KEY(categoryId) REFERENCES Categories(id)
);

-- Orders Table
CREATE TABLE Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    billNumber TEXT NOT NULL UNIQUE,
    orderType TEXT CHECK(orderType IN ('DineIn', 'Takeaway')) NOT NULL,
    subtotal REAL NOT NULL,
    gstAmount REAL NOT NULL,
    total REAL NOT NULL,
    paymentStatus TEXT CHECK(paymentStatus IN ('Unpaid', 'Paid', 'Hold')) NOT NULL,
    createdBy INTEGER NOT NULL,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    locked BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY(createdBy) REFERENCES Users(id)
);

-- OrderItems Table
CREATE TABLE OrderItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    itemName TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unitPrice REAL NOT NULL,
    lineTotal REAL NOT NULL,
    FOREIGN KEY(orderId) REFERENCES Orders(id)
);

-- Payments Table
CREATE TABLE Payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    paymentMethod TEXT CHECK(paymentMethod IN ('Cash', 'UPI', 'Card', 'Split')) NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY(orderId) REFERENCES Orders(id)
);
                `}</CodeBlock>
            </Section>
            
            <Section title="Multi-User Concurrency & Order Locking">
                <p>To prevent conflicts in a multi-cashier environment, the following strategies are essential:</p>
                <ol>
                    <li><strong>Order Locking:</strong> When a cashier opens an order (either a new one or a held one), a <code>locked</code> flag in the <code>Orders</code> table should be set to <code>true</code>. Other terminals should respect this flag and prevent editing. The lock should be released when the order is paid, held, or cancelled.</li>
                    <li><strong>Sequential Bill Numbers:</strong> The backend API must handle bill number generation centrally to avoid duplicates. A dedicated sequence or table in the database (or a pattern like <code>YYYYMMDD-XXXX</code>) should be used, with transactions ensuring atomicity.</li>
                    <li><strong>Atomic Transactions:</strong> All database operations that modify multiple tables (e.g., creating an order and its items) must be wrapped in a database transaction. This ensures that if any part of the operation fails, the entire operation is rolled back, preventing data inconsistency.</li>
                    <li><strong>Offline-First Logic:</strong> In an Electron setup, the app can store orders locally in SQLite. When network connectivity is available, it can sync with the central server. The server would then be the single source of truth for reporting and bill numbers.</li>
                </ol>
            </Section>

            <Section title="Local Network Deployment">
                 <ol>
                    <li><strong>Master/Server PC:</strong> Designate one reliable computer as the server. This PC will run the Node.js backend and the SQLite/PostgreSQL database. It should have a static IP address on the local network (e.g., 192.168.1.10).</li>
                    <li><strong>Client Terminals:</strong> Other computers or tablets (clients) will run the POS application (packaged via Electron or accessed via a web browser).</li>
                    <li><strong>Connection:</strong> The client apps will be configured to send all API requests to the master PC's local IP address (e.g., <code>http://192.168.1.10:3000/api</code>).</li>
                    <li><strong>WiFi Network:</strong> All devices must be connected to the same secure WiFi network. A dedicated router for the POS system is recommended for stability and security.</li>
                </ol>
            </Section>
        </div>
    );
};

export default SystemInfoView;
