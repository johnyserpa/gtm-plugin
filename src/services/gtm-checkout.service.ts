import { GtmHelper } from './../gtm-helper';

/**
 * Service to report checkout data.
 */
export class GtmCheckoutService {

    /**
     * Helper class.
     */
    private helper: GtmHelper;
    
    /**
     * Constructor method.
     * 
     * @param configs 
     */
    constructor(private configs: GtmPluginConfigs) {
        /**
         * Instanciate helper class.
         */
        this.helper = new GtmHelper(this.configs.debug);
    }

    /**
     * Method to track checkout process.
     * 
     * Tracks on event "checkout" OR "initiateCheckout".
     * 
     * https://developers.google.com/tag-manager/enhanced-ecommerce#checkoutstep
     * 
     * @param step 
     * @param products 
     */
    trackCheckout(step: number, products?: ProductData[]) {
        this.helper.log("trackCheckout Checkout Service...");
        /**
         * Validations.
         */
        if (!step || isNaN(step)) throw new Error("Step must be an int passed as argument!");
        
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

        this.helper.log("Checkout object: ", gtmObj);

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
            this.helper.log("Checkout step 1 object: ", gtmObj);
        }

        this.helper.log("Pushing object to dataLayer...", this.configs.dataLayer);
        this.configs.dataLayer.push(gtmObj);

        return true;
    }

    
    }