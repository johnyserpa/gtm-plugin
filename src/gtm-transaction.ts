import { GtmTransactionService } from './services/gtm-transaction.service';
import { GtmHelper } from './gtm-helper';


/**
 * Class to manage transaction tracking.
 * 
 * Exceutes automatically when transactionInfoSelector exists in page.
 */
export class GtmTransaction {

    /**
     * Helper class.
     */
    private helper: GtmHelper;
    private service: GtmTransactionService;

    /**
     * Constructor method.
     * 
     * @param configs
     */
    constructor(private configs: GtmPluginConfigs) {
        /**
         * Instanciate Helper class.
         */
        this.helper = new GtmHelper(this.configs.debug);
        this.helper.log("Starting GtmProductDetail class..")

        /**
         * Instanciate service class.
         */
        this.service = new GtmTransactionService(this.configs);
    }

    /**
     * Method to scrap transaction and report to service.
     * 
     * @return boolean
     */
    trackTransaction(): boolean {
        /**
         * Find gtm information element.
         */
        let transactionInfo: Element = document.querySelector(this.configs.transaction.transactionInfoSelector);

        /**
         * If there is no element, abort.
         */
        if (!transactionInfo) return false;

        this.helper.log("Reporting transaction to service...");

        /**
         * Report transaction to service.
         */
        this.service.trackPurchase({
            id: (transactionInfo as HTMLElement).dataset.id,
            revenue: (transactionInfo as HTMLElement).dataset.revenue,
            tax: (transactionInfo as HTMLElement).dataset.tax,
            shipping: (transactionInfo as HTMLElement).dataset.shipping
        }, JSON.parse((transactionInfo as HTMLElement).dataset.products) as ProductData[]);

        return true;
    }

}