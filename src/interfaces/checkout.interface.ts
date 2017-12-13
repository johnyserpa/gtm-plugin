interface Checkout {
    /**
     * Transaction ID.
     */
    event: string;

    /**
     * Ecommerce object.
     */
    ecommerce: {
        currencyCode: string,
        checkout: {
            actionField: {
                step: number
            },
            products?: ProductData[]
        }
    }
    
    /**
     * Extra info for FB Pixel tag.
     */
    productIds?: string[];
    productSumPrices?: number;
    productCount?: number;
}