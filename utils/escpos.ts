
import type { Order, BusinessConfig } from '../types';

// ESC/POS Commands (as strings for easy concatenation)
const ESC = '\x1B';
const GS = '\x1D';
const NUL = '\x00';

const INIT = `${ESC}@`;
const BOLD_ON = `${ESC}E\x01`;
const BOLD_OFF = `${ESC}E\x00`;
const DBL_HEIGHT_ON = `${GS}!\x01`;
const DBL_WIDTH_ON = `${GS}!\x10`;
const DBL_ON = `${GS}!\x11`;
const DBL_OFF = `${GS}!\x00`;
const ALIGN_LEFT = `${ESC}a\x00`;
const ALIGN_CENTER = `${ESC}a\x01`;
const ALIGN_RIGHT = `${ESC}a\x02`;
const CUT = `${GS}V\x01`;

const line = (char = '-', width = 32) => char.repeat(width) + '\n';

export function generateReceipt(order: Order, config: BusinessConfig): string {
    let commands = '';
    const currency = 'Rs.'; // Use 'Rs.' for thermal printing alignment
    
    const pad = (str1: string, str2: string, width = 32) => {
        const len = str1.length + str2.length;
        const padding = Math.max(0, width - len);
        return str1 + ' '.repeat(padding) + str2;
    };
    
    commands += INIT;
    commands += ALIGN_CENTER;
    
    // Header
    if (config.receipt.showHeader) {
        if (config.receipt.headerFontSize === 'double') {
            commands += `${BOLD_ON}${DBL_ON}${config.receipt.headerText}${DBL_OFF}${BOLD_OFF}\n`;
        } else {
            commands += `${BOLD_ON}${config.receipt.headerText}${BOLD_OFF}\n`;
        }
        commands += `Coles Park, Bangalore\n`;
        commands += line();
    }
    
    commands += ALIGN_LEFT;
    if (config.receipt.showBillNumber) {
        commands += `Bill No: ${order.billNumber}\n`;
    }
    if (config.receipt.showDate) {
        commands += `Date: ${new Date(order.createdAt).toLocaleString()}\n`;
    }
    commands += line();
    
    commands += `${BOLD_ON}${pad('Item', 'Total')}${BOLD_OFF}\n`;
    
    if (config.receipt.itemFontSize === 'double') {
        commands += DBL_HEIGHT_ON;
    }

    order.items.forEach(item => {
        let itemName = item.itemName;
        
        commands += `${itemName}\n`;
        // Indent quantity and price line
        commands += pad(`  ${item.quantity} x ${item.unitPrice}`, item.lineTotal.toFixed(2));
        commands += `\n`;
    });

    if (config.receipt.itemFontSize === 'double') {
        commands += DBL_OFF;
    }
    
    commands += line();
    
    commands += ALIGN_RIGHT;
    commands += pad('Subtotal: ', order.subtotal.toFixed(2));
    commands += `\n`;
    if (config.gstEnabled) {
        commands += pad(`GST (${config.gstRate * 100}%): `, order.gstAmount.toFixed(2));
        commands += `\n`;
    }
    commands += `${BOLD_ON}${DBL_HEIGHT_ON}`;
    commands += pad('TOTAL: ', `${currency}${order.total.toFixed(2)}`);
    commands += `\n`;
    commands += `${DBL_OFF}${BOLD_OFF}`;
    
    commands += line();
    commands += ALIGN_CENTER;
    commands += `${config.receipt.footerText}\n\n\n`;
    commands += CUT;

    return commands.replace(/₹/g, 'Rs.').replace(/❤️/g, '');
}


export function generateKOT(order: Order): string {
    let commands = '';

    commands += INIT;
    commands += ALIGN_CENTER;
    commands += `${BOLD_ON}${DBL_ON}KOT${DBL_OFF}${BOLD_OFF}\n\n`;
    
    commands += ALIGN_LEFT;
    commands += `${BOLD_ON}Bill No: ${order.billNumber}${BOLD_OFF}\n`;
    commands += `Type: ${order.orderType}\n`;
    commands += `Time: ${new Date(order.createdAt).toLocaleTimeString()}\n`;
    commands += line('=');
    
    commands += `${BOLD_ON}${DBL_HEIGHT_ON}`;
    order.items.forEach(item => {
        const qty = `x${item.quantity}`;
        const name = item.itemName;
        const width = 20; // Double width characters
        const padding = Math.max(0, width - name.length - qty.length);
        commands += `${name}${' '.repeat(padding)}${qty}\n`;
    });
    commands += `${DBL_OFF}${BOLD_OFF}`;
    
    commands += `\n\n\n`;
    commands += CUT;

    return commands.replace(/₹/g, 'Rs.').replace(/❤️/g, '');
}
