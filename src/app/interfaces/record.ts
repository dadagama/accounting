export interface Record {
    description?: string;
    isVisible?: boolean;
    price: number;
    expense: number;
    productId: string;
    sellerId?: string;
    // ticketId?: string;
    timestamp?: number;
    uuid?: string;
}
