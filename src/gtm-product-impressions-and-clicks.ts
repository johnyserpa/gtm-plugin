import { GtmProductImpressionsAndClicksService } from './services/gtm-impressions-and-clicks.service';
import { GtmHelper } from './gtm-helper';


/**
 * Class to scrap HTML listings and product impression data and return to wrapper method.
 * 
 * This class will search for the list selector, iterate all divs with the product selector report them to service.
 * 
 * This class will also search for all links in products divs in listings and add a click event listender to report the procuct clicked to service.
 */
export class GtmProductListings {
    /**
     * Helper class.
     */
    private helper: GtmHelper;
    private service: GtmProductImpressionsAndClicksService;

    /**
     * Constructor method.
     * 
     * @param configs 
     * @param debug 
     */
    constructor(private configs: GtmPluginConfigs) {
        this.helper = new GtmHelper(this.configs.debug);
        this.helper.log("Starting GtmProductImpressions class..")

        this.service = new GtmProductImpressionsAndClicksService(this.configs);
    }

    /**
     * Add click event listener to products.
     * 
     * @param cssWrapperSelecto optional
     */
    trackClicks(cssWrapperSelector?: string) {
        /**
         * Find all lists in document.
         */
        let lists: NodeListOf<Element>;
        if (cssWrapperSelector) lists = document.querySelectorAll(cssWrapperSelector + " " + this.configs.impressionsAndClicks.listSelector);
        else lists = document.querySelectorAll(this.configs.impressionsAndClicks.listSelector);

        this.helper.log("Tracking clicks...");
        this.helper.log(cssWrapperSelector ? "CssWrapperSelector: " + cssWrapperSelector + "..." : "No cssWrapperSelector...");
        this.helper.log("Found " + lists.length + " lists...");

        /**
         * Iterate all lists in found.
         */
        lists.forEach((list: HTMLElement, i) => {
            /**
             * Find all products in this list.
             */
            let products: NodeListOf<Element> = list.querySelectorAll(this.configs.impressionsAndClicks.productContainerSelector);
            this.helper.log("Found " + products.length + " products with selector " + this.configs.impressionsAndClicks.productContainerSelector + "...");
            /**
             * Iterate all products in this list.
             */
            products.forEach((product: HTMLElement, prodIndex) => {
                /**
                 * Find all links in product.
                 */
                let links: NodeListOf<Element> = product.querySelectorAll(this.configs.impressionsAndClicks.productLinkSelector);
                this.helper.log("Found " + links.length + " links...");
                /**
                 * Get node with gtm info.
                 */
                let info: Element = product.querySelector(this.configs.impressionsAndClicks.productInfoSelector);
                /**
                 * Iterate all links in product.
                 */
                links.forEach((link: HTMLElement, i) => {
                    this.helper.log("Adding event lstener to link...");
                    /**
                     * Add click event listener.
                     */
                    link.addEventListener('click', () => {
                        /**
                         * Call service when clicked.
                         */
                        this.service.trackProductClick(list.dataset.name, {
                            id: (info as HTMLElement).dataset.id,
                            name: (info as HTMLElement).dataset.name,
                            brand: (info as HTMLElement).dataset.brand,
                            category: (info as HTMLElement).dataset.category,
                            price: this.helper.formatPrice((info as HTMLElement).dataset.price),
                            position: prodIndex
                        });
                    });
                });
            });
        });
    }

    /**
     * Impressions method, to report impressions data to service.
     * 
     * @param cssWrapperSelecto optional
     */
    trackImpressions(cssWrapperSelector?: string): boolean | null {
        /**
         * Check if there are listings in page.
         */
        let listings: NodeListOf<Element> = this.getListingElements(cssWrapperSelector);
        if (listings.length <= 0) {
            this.helper.log("No listings in page..");
            return null;
        }

        /**
         * Found listings.
         */
        this.helper.log("Found " + listings.length + " listings in page..");

        /**
         * Call method to mount listings array.
         */
        const listingsMounted: ProductData[] = this.listingsMounter(listings);

        /**
         * If no listings returned, abort.
         */
        if (!listingsMounted) return null;

        /**
         * Report to service.
         */
        this.service.trackProductImpressions(listingsMounted);
        return true;
    }

    /**
     * Check if there are listings in page.
     * 
     * @return false if none OR number of listings.
     */
    getListingElements(selector?: string): NodeListOf<Element> {
        let listings: NodeListOf<Element>;
        if (selector) listings = document.querySelectorAll(selector + " " + this.configs.impressionsAndClicks.listSelector);
        else listings = document.querySelectorAll(this.configs.impressionsAndClicks.listSelector);
        this.helper.log("Getting list elements by selector: " +  this.configs.impressionsAndClicks.listSelector + " : Found ->", listings);
        return listings;
    }

    /**
     * Method to iterate all listings and mount products array.
     */
    listingsMounter(listings: NodeListOf<Element>): ProductData[] {
        this.helper.log("Starting listingsMounter function..");
        /**
         * Array of lists with products associated.
         */
        let listingsMounted: ProductData[] = [];
        /**
         * Iterate all lists.
         */
        this.helper.log("Got " + listings.length + " listings..");
        listings.forEach((list: HTMLElement, i) => {
            this.helper.log("Iterating " + i + " listing element...");
            /**
             * If List has no name, abort.
             */
            if (!list.dataset.name) throw new Error("List " + list + " without name..");

            /**
             * Create a temporary object to hold products data.
             */
            let products = list.querySelectorAll(this.configs.impressionsAndClicks.productInfoSelector);
            this.helper.log("List " + i + " | Found " + products.length + " products.");

            /**
             * If list has no products, abort.
             */
            if (!products) throw new Error("List " + list + " without products..");

            /**
             * Iterate all products and add to temp object.
             */
            products.forEach((product: HTMLElement, i) => {
                listingsMounted.push({
                    id: product.dataset.id,
                    name: product.dataset.name,
                    brand: product.dataset.brand,
                    category: product.dataset.category,
                    price: this.helper.formatPrice(product.dataset.price),
                    position: i,
                    list: list.dataset.name
                });
            });

            return true;
        });

        return listingsMounted;
    }


}