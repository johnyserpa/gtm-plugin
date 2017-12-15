import { GtmTransaction } from './gtm-transaction';
import { GtmCheckout } from './gtm-checkout';
import { GtmProductCart } from './gtm-product-cart';
import { GtmProductDetail } from './gtm-product-detail';
import { GtmProductListings } from './gtm-product-impressions-and-clicks';

/**
 * GTM Wrapper Class.
 * 
 * All starts here...
 */
export class GtmWrapper {

    /**
     * Shared classes by functions.
     */
    private trackCartClass: GtmProductCart;
    private trackImpressionsAndClicksClass: GtmProductListings;

    /**
     * Constructor method.
     * ---
     * @param configs GtmPluginConfigs
     */
    constructor(private configs: GtmPluginConfigs) {
        if (!configs.dataLayer) throw new Error("dataLayer must be passed to constructor");

        /**
         * Call methods that have status = true.
         */
        if (configs.impressionsAndClicks && configs.impressionsAndClicks.status) this.triggerImpressionsAndClicks();
        if (configs.detail && configs.detail.status) this.triggerDetail();
        if (configs.cart && configs.cart.status) this.triggerCart();
        if (configs.checkout && configs.checkout.status) this.triggerCheckout();
        if (configs.transaction && configs.transaction.status) this.triggerTransaction();
    }

    /**
     * Trigger impressions tracking.
     */
    private triggerImpressionsAndClicks() {
        try {
            this.trackImpressionsAndClicksClass = new GtmProductListings(this.configs);
            this.trackImpressionsAndClicksClass.trackImpressions();
            this.trackImpressionsAndClicksClass.trackClicks();
        } catch (e) {
            console.error(e);
        }
    }
    public trackImpressionsAndClicksBySelector(cssWrapperSelector: string) {
        try {
            this.trackImpressionsAndClicksClass.trackImpressions(cssWrapperSelector);
            this.trackImpressionsAndClicksClass.trackClicks(cssWrapperSelector);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Trigger detail tracking.
     */
    private triggerDetail() {
        try {
            const trackDetailClass = new GtmProductDetail(this.configs);
            trackDetailClass.trackDetails();
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Trigger cart tracking.
     */
    private triggerCart() {
        try {
            this.trackCartClass = new GtmProductCart(this.configs);
        } catch (e) {
            console.error(e);
        }
    }
    public addToCart(product: ProductData) {
        try {
            this.trackCartClass.addToCart(product);
        } catch (e) {
            console.error(e);
        }
    }
    public removeFromCart(product: ProductData) {
        try {
            this.trackCartClass.removeFromCart(product);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Trigger checkout tracking.
     */
    private triggerCheckout() {
        try {
            const trackCheckoutClass = new GtmCheckout(this.configs);
            trackCheckoutClass.trackCheckout();
        } catch (e) {
            console.error(e);
        }
    }
    
    /**
     * Trigger transaction tracking.
     */
    private triggerTransaction() {
        try {
            const trackTransactionClass = new GtmTransaction(this.configs);
            trackTransactionClass.trackTransaction();
        } catch (e) {
            console.error(e);
        }
    }
}
