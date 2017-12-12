/**
 * Product Impression Data definition.
 * ---
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#impression-data
 */
interface ImpressionData {
    /**
     * The product ID or SKU (e.g. P67890). *Either this field or name must be set.
     */
    id: string;

    /**
     * The name of the product (e.g. Android T-Shirt). *Either this field or id must be set.
     */
    name: string;

    /**
     * The list or collection to which the product belongs (e.g. Search Results)
     */
    list?: string;

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
     * The product's position in a list or collection (e.g. 2).
     */
    position?: number;

    /**
     * The price of a product (e.g. 29.20).
     */
    price?: number;
}