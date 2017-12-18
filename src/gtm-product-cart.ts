import { GtmCartService } from './services/gtm-cart.service';
import { GtmHelper } from './gtm-helper';

/**
 * Class to manage Cart event trackings.
 * 
 * This class is a simple validator and communication tunnel to the service.
 */
export class GtmProductCart {

    /**
     * Helper class.
     */
    private helper: GtmHelper;
    /**
     * Cart service.
     */
    private service: GtmCartService;

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
        this.service = new GtmCartService(this.configs);
    }

    /**
     * Method to report addToCart products to service.
     *
     * @param product
     * @return boolean always true.
     */
    addToCart(product: ProductData): boolean {
        if (!product) throw new Error("addToCart method: Product must be passed as argument.");
        this.helper.log("Adding product to cart..", product);

        /**
         * Reporting to service method.
         */
        this.service.trackProductAddToCart(product);

        return true;
    }
    
    /**
     * Method to report removeFromCart products to service.
     * @param product
     */
    removeFromCart(product: ProductData) {
        if (!product) throw new Error("addToCart method: Product must be passed as argument.");
        this.helper.log("Removing product from cart..", product);

        /**
         * Reporting to service method.
         */
        this.service.trackProductRemoveFromCart(product);

        return true;
    }
}