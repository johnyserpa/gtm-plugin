/**
 * Product Data definition.
 * ---
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-data
 */
interface ProductData {
    /**
     * The product ID or SKU (e.g. P67890). *Either this field or name must be set.
     */
    id: string;

    /**
     * The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
     */
    name: string;

    /**
     * The brand associated with the product (e.g. Google).
     */
    brand?: string;

    /**
     * The category to which the product belongs (e.g. Apparel). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Apparel/Men/T-Shirts).
     */
    category?: string;

    /**
     * The variant of the product (e.g. Black).
     */
    variant?: string;

    /**
     * The price of a product (e.g. 29.20).
     */
    price?: string;

    /**
     * The quantity of a product (e.g. 2).
     */
    quantity?: number;

    /**
     * The coupon code associated with a product (e.g. SUMMER_SALE13).
     */
    coupon?: number;
    
    /**
     * The product's position in a list or collection (e.g. 2).
     */
    position?: number;

    /**
     * The product URL.
     */
    url?: string;

    /**
     * The product main image.
     */
    img?: string;

    /**
     * List associated.
     */
    list?: string;

}