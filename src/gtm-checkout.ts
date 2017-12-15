import { GtmCheckoutService } from './services/gtm-checkout.service';
import { GtmHelper } from './gtm-helper';


/**
 * Class to manage checkout tracking.
 * 
 * Executes automatically when checkoutInitiateSelector or checkoutStepSelector in page.
 */
export class GtmCheckout {

    /**
     * Helper class.
     */
    private helper: GtmHelper;
    private service: GtmCheckoutService;

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
        this.service = new GtmCheckoutService(this.configs);
    }

    /**
     * Init method to manage reporting to service.
     */
    trackCheckout(): boolean {
        /**
         * Check for checkoutInitiateSelector element in page.
         */
        let checkoutInitiate: Element = document.querySelector(this.configs.checkout.checkoutInitiateSelector);
        this.helper.log("Checking initiate checkout..");
        if (checkoutInitiate) {
            /**
             * Calls initiate checkout method.
             */
            this.helper.log("Initiating checkout..");
            this.checkoutInitiate();
            return true;
        }
        this.helper.log("Not initiate checkout..");
        
        /**
         * Check for checkoutStepSelector element in page.
         */
        let checkoutStep: Element = document.querySelector(this.configs.checkout.checkoutStepSelector);
        this.helper.log("Checking checkout step..", checkoutStep, this.configs.checkout.checkoutStepSelector);
        if (checkoutStep) {
            /**
             * Calls checkout step method.
             */
            this.helper.log("Step checkout..");
            this.checkoutStep((checkoutStep as HTMLElement).dataset.step);
            return true;
        }
        this.helper.log("Not checkout step..");
        
        /**
         * Nothing happened.
         */
        return false;
    }

    /**
     * Method to report initiate checkout to service.
     */
    checkoutInitiate() {
        let step = 1;
        let products: ProductData[] = [];
        /**
         * Find all productInfoSelector nodes.
         */
        let productNodes: NodeListOf<Element> = document.querySelectorAll(this.configs.checkout.productInfoSelector); // Normally I would use this approach.
        //let productNodes = <Node[]><any>document.querySelectorAll(this.configs.checkout.productInfoSelector); // <Node[]><any> to make it array like and iterable with map function.
        /**
         * Iterate and append to products array.
         */
        productNodes.forEach((product: HTMLElement, i) => {
            products.push({
                id: product.dataset.ref,
                name: product.dataset.name,
                brand: product.dataset.brand,
                category: product.dataset.category,
                price: product.dataset.price,
                variant: product.dataset.variant,
                quantity: +product.dataset.quantity
            });
        });

        this.helper.log("Found " + products.length + " products..", products);
        /**
         * Report step and products to service.
         */
        this.service.trackCheckout(step, products);
    }

    /**
     * Method to report checkout step to service.
     * 
     * @param step expected string, but is casted to number.
     */
    checkoutStep(step: string) {
        /**
         * Validations.
         */
        if (!step || isNaN(+step)) throw new Error("checkoutStep method: Step is not a number...");
        this.helper.log("Reporting checkout step " + step + "...");
        
        /**
         * Call service method
         */
        this.service.trackCheckout(+step);
    }
}