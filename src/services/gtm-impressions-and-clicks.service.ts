export class GtmProductImpressionsAndClicksService {

    constructor(private configs: GtmPluginConfigs) {}

    /**
     * Method for product impression tracking.
     * ---
     * Tracks on event "productImpressions".
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
     * 
     * @param products
     */
    trackProductImpressions(products: ProductData[]): boolean {
        if (!products) throw new Error("Products must be passed as parameter!");

        this.configs.dataLayer.push({
            event: "productImpressions",
            ecommerce: {
                currencyCode: this.configs.currency,
                impressions: products
            }
        });
        return true;
    }

    /**
     * Method for product click tracking.
     * ---
     * Tracks on event "productClick".
     * ----
     * https://developers.google.com/tag-manager/enhanced-ecommerce#product-clicks
     * 
     * @param list
     * @param product
     */
    trackProductClick(list: string, product: ProductData) {
        if (!product) return new Error("Product must be passed as argument!");

        this.configs.dataLayer.push({
            event: "productClick",
            ecommerce: {
                currencyCode: this.configs.currency,
                click: {
                    actionField: {
                        list: list
                    },
                    products: [product]
                }
            }
        });

        return true;
    }
}