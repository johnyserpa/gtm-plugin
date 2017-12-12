/**
 * GTM Plugin
 */
export class GtmPlugin {

    /**
     * Constructor method.
     * ---
     * @param configs GtmPluginConfigs
     */
    constructor(private configs: GtmPluginConfigs) {
        if (!configs.dataLayer) throw new Error("dataLayer must be passed to constructor");
    }

    /**
     * Method for product impression tracking.
     * ---
     * Tracks on every page.
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
     * 
     * @param products
     */
    trackProductImpressions(products: ImpressionData[]) {
        if (!products) return new Error("Products must be passed as parameter!");

        this.configs.dataLayer.push({
            //event: "productImpressions",
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
     * Tracks on event.
     * ----
     * https://developers.google.com/tag-manager/enhanced-ecommerce#product-clicks
     * 
     * @param list
     * @param product
     */
    trackProductClick(list: string, product: ProductData) {
        if (!list) return new Error("List must be passed as argument!");
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

    /**
     * Method to track product detail page.
     * --- 
     * Tracks on event.
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#details
     * 
     * @param product 
     */
    trackProductDetail(product: ProductData) {
        if (!product) return new Error("Product must be passed as argument!");

        this.configs.dataLayer.push({
            event: "productDetail",
            ecommerce: {
                currencyCode: this.configs.currency,
                detail: {
                    products: [product]
                }
            }
        })

        return true;
    }


    /**
     * Method to track product added to cart.
     * ---
     * Tracks on event.
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#add
     * 
     * @param product
     */
    trackProductAddToCart(product: ProductData) {
        if (!product) return new Error("Product must be passed as argument!");

        this.configs.dataLayer.push({
            event: "addToCart",
            ecommerce: {
                currencyCode: this.configs.currency,
                add: {
                    products: [product]
                }
            }
        })

        return true;
    }

    /**
     * Method to track product removed from cart.
     * ---
     * Tracks on event.
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#add
     * 
     * @param product
     */
    trackProductRemoveFromCart(product: ProductData) {
        if (!product) return new Error("Product must be passed as argument!");

        this.configs.dataLayer.push({
            event: "removeFromCart",
            ecommerce: {
                currencyCode: this.configs.currency,
                remove: {
                    products: [product]
                }
            }
        })

        return true;
    }

    /**
     * Method to track checkout process.
     * ---
     * Tracks on event.
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#checkoutstep
     * 
     * @param step 
     * @param products 
     */
    checkout(step: number, products: ProductData[]) {
        if (!step || isNaN(step)) return new Error("Step must be an int passed as argument!");
        if (!products) return new Error("Products must be passed as argument!");
        
        /**
         * Create gtm object to be pushed to dataLayer.
         */
        let gtmObj: Checkout = {
            event: "checkout",
            ecommerce: {
                currencyCode: this.configs.currency,
                checkout: {
                    actionField: {
                        step: step
                    }
                }
            }
        };

        /**
         * Only on step 1, all products must be passed.
         */
        if (step === 1) {
            let contentIds: string[] = [], price: number = 0, numItems:number = 0;
            products.forEach(function(p) {
              contentIds.push(p.id);
              price += p.price;
              numItems += p.quantity;
            });

            gtmObj.ecommerce.checkout.products = products;
            gtmObj.productIds = contentIds;
            gtmObj.productCount = numItems;
            gtmObj.productSumPrices = price;
        }

        this.configs.dataLayer.push(gtmObj);

        return true;
    }

    /**
     * Method to track transaction.
     * ---
     * Tracks on event.
     * --- 
     * https://developers.google.com/tag-manager/enhanced-ecommerce#purchases
     * 
     * @param products
     */
    trackPurchase(transaction: any, products: ProductData[]) {
        if (!transaction) return new Error("Transaction must be passed as argument!");
        if (!products) return new Error("Products must be passed as argument!");

        let contentIds = products.map((p) => {
            return p.id;
        });

        this.configs.dataLayer.push({
            event: "transaction",
            ecommerce: {
                purchase: {
                    actionField: transaction,
                    products: products
                }
            },
            productIds: contentIds,
            transactionRevenue: transaction.revenue
        });

        return true;
    }

    


}
