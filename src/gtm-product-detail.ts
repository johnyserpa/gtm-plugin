import { GtmProductDetailService } from './services/gtm-detail.service';
import { GtmHelper } from './gtm-helper';


/**
 * Class to manage Product Detail tracking.
 */
export class GtmProductDetail {

    /**
     * Helper class.
     */
    private helper: GtmHelper;
    private service: GtmProductDetailService;

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
        this.service = new GtmProductDetailService(this.configs);
    }

    /**
     * Method to report product details to service.
     * 
     * @return boolean
     */
    trackDetails(): boolean {
        /**
         * Find detailPageSelector in page.
         */
        let detailPageDiv: Element = document.querySelector(this.configs.detail.detailPageSelector);
        if (detailPageDiv == null) {
            /**
             * Not in detail page, abort.
             */
            this.helper.log("Aborting tracking details.. Not in details page..");
            return false;
        }

        /**
         * Find productInfoSelector in page.
         */
        let detailInfo: Element = document.querySelector(this.configs.detail.productInfoSelector);
        if (detailInfo == null) {
            /**
             * Not in detail page, abort.
             */
            this.helper.log("Aborting tracking details.. No product info..");
            return false;
        }

        this.helper.log("Reporting detail info to service...");

        /**
         * Reporting product detail data to service.
         */
        let trackObject: any = {
            id: (detailInfo as HTMLElement).dataset.id,
            name: (detailInfo as HTMLElement).dataset.name,
            brand: (detailInfo as HTMLElement).dataset.brand,
            category: (detailInfo as HTMLElement).dataset.category,
            price: this.helper.formatPrice((detailInfo as HTMLElement).dataset.price)
        };

        if (this.configs.detail.extra) {
            this.configs.detail.extra.forEach((el, i) => {
                trackObject[el] = (detailInfo as HTMLElement).dataset[el];
            });
        }

        this.service.trackProductDetail(trackObject);

        return true;
    }

}