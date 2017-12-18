interface TransactionData {
    /**
     * Transaction ID.
     */
    id: string;
    
    /**
     * Transaction Revenue.
     */
    revenue: string;
    
    /**
     * Transaction tax.
     */
    tax: string;
    
    /**
     * Transaction shipping cost.
     */
    shipping: string;
    
    /**
     * Product Ids.
     */
    productIds?: string[];

    /**
     * Affiliation.
     */
    affiliation?: string;
    
    /**
     * Transaction coupon.
     */
    coupon?: string;
}