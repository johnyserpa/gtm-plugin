import { GtmHelper } from './../gtm-helper';


/**
 * Service to report transaction data.
 */
export class GtmTransactionService {

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
        this.helper = new GtmHelper(this.configs.debug);
    }

    /**
     * Method to report transaction to GTM.
     * 
     * Reports on event "transaction".
     *  
     * https://developers.google.com/tag-manager/enhanced-ecommerce#purchases
     * 
     * @param products
     */
    trackPurchase(transaction: any, products: ProductData[]) {
        /**
         * Arguments must be passed.
         */
        if (!transaction) return new Error("Transaction must be passed as argument!");
        if (!products) return new Error("Products must be passed as argument!");

        /**
         * Map products id to an array.
         */
        transaction.productIds = products.map((p) => {
            return p.id;
        });

        /**
         * Report to GTM through dataLayer.
         */
        this.configs.dataLayer.push({
            event: "transaction",
            /*ecommerce: {
                purchase: {
                    actionField: transaction,
                    products: products
                }
            },*/
            transaction: transaction,
            products: products
        });

        return true;
    }   

    
}