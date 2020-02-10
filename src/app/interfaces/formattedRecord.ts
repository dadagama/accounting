export interface FormattedRecord {
    checked: boolean;
    customerId?: string;
    customerName?: string;
    date: string;
    description?: string;
    expense: number;
    needsInventory?: boolean;
    price: number;
    productId?: string;
    productImage?: string;
    productName: string;
    rendered: boolean;
    selected?: boolean;
    sellerId?: string;
    sellerName?: string;
    // ticketId?: string;
    uuid?: string;
}
