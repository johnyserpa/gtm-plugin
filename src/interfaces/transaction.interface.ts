interface Transaction {
    /**
     * Transaction ID.
     */
    id: string;

    /**
     * Affiliation.
     */
    affiliation: string;

    /**
     * Transaction Revenue.
     */
    revenue: number;

    /**
     * Transaction tax.
     */
    tax: number;

    /**
     * Transaction shipping cost.
     */
    shipping: number;

    /**
     * Transaction coupon.
     */
    coupon: string;
}