export interface FormattedRecord {
    date: string;
    description?: string;
    price: number;
    expense: number;
    productImage?: string;
    productName: string;
    productId?: string;
    sellerId?: string;
    sellerName?: string;
    selected?: boolean;
    needsInventory?: boolean;
    checked: boolean;
    rendered: boolean;
    // ticketId?: string;
    uuid?: string;
}
