/**
 * Service to report cart data.
 */
export class GtmCartService {

    /**
     * Constructor method.
     * 
     * @param configs 
     */
    constructor(private configs: GtmPluginConfigs) {}

    /**
     * Method to track product added to cart.
     * 
     * Tracks on event "addToCart".
     * 
     * https://developers.google.com/tag-manager/enhanced-ecommerce#add
     * 
     * @param product
     */
    trackProductAddToCart(product: ProductData): boolean {
        /**
         * Validations.
         */
        if (!product) throw new Error("Product must be passed as argument!");

        /**
         * Report to GTM through dataLayer.
         */
        this.configs.dataLayer.push({
            event: "addToCart",
            ecommerce: {
                currencyCode: this.configs.currency,
                add: {
                    products: [product]
                }
            },
            productInfo: product
        })

        return true;
    }

    /**
     * Method to track product removed from cart.
     * 
     * Tracks on event "removeFromCart".
     * 
     * https://developers.google.com/tag-manager/enhanced-ecommerce#add
     * 
     * @param product
     */
    trackProductRemoveFromCart(product: ProductData): boolean {
        /**
         * Validations.
         */
        if (!product) throw new Error("Product must be passed as argument!");

        /**
         * Report to GTM through dataLayer.
         */
        this.configs.dataLayer.push({
            event: "removeFromCart",
            ecommerce: {
                currencyCode: this.configs.currency,
                remove: {
                    products: [product]
                }
            },
            productInfo: product
        })

        return true;
    }
}