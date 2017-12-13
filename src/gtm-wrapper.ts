import { GtmProductDetail } from './gtm-product-detail';
import { GtmProductListings } from './gtm-product-impressions-and-clicks';

/**
 * GTM Plugin
 */
export class GtmWrapper {

    /**
     * Constructor method.
     * ---
     * @param configs GtmPluginConfigs
     */
    constructor(private configs: GtmPluginConfigs) {
        if (!configs.dataLayer) throw new Error("dataLayer must be passed to constructor");

        if (configs.impressionsAndClicks.status) this.triggerImpressionsAndClicks();
        if (configs.detail.status) this.triggerDetail();
    }

    /**
     * Trigger impressions tracking.
     * --
     * TODO: config validations
     */
    triggerImpressionsAndClicks() {
        try {
            const trackImpressionsAndClicksClass = new GtmProductListings(this.configs);
            trackImpressionsAndClicksClass.trackImpressions();
            trackImpressionsAndClicksClass.trackClicks();
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Trigger detail tracking.
     */
    triggerDetail() {
        try {
            const trackDetailClass = new GtmProductDetail(this.configs);
            trackDetailClass.trackDetails();
        } catch (e) {
            console.error(e);
        }
    }


    /**
     * Method to track product added to cart.
     * ---
     * Tracks on event "addToCart".
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
     * Tracks on event "removeFromCart".
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
     * Tracks on event "checkout" OR "initiateCheckout".
     * ---
     * https://developers.google.com/tag-manager/enhanced-ecommerce#checkoutstep
     * 
     * @param step 
     * @param products 
     */
    trackCheckout(step: number, products: ProductData[]) {
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
              price += +p.price;
              numItems += p.quantity;
            });
            
            gtmObj.event = "initiateCheckout"; // If first step, event is initiate checkout.
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
     * Tracks on event "transaction".
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
            /*ecommerce: {
                purchase: {
                    actionField: transaction,
                    products: products
                }
            },*/
            transactionId: transaction.id,
            productIds: contentIds,
            transactionRevenue: transaction.revenue
        });

        return true;
    }

    


}
