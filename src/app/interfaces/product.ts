export interface Product {
    id: string;
    image?: string;
    isVisible: boolean | string;
    name: string;
    needsInventory?: boolean | string;
    needsSeller?: boolean | string;
    quantity?: number;
    tags: string[] | string;
}
