import { GtmProductDetailService } from './services/gtm-detail.service';
import { GtmHelper } from './gtm-helper';


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
     * @param debug 
     */
    constructor(private configs: GtmPluginConfigs) {
        this.helper = new GtmHelper(this.configs.debug);
        this.helper.log("Starting GtmProductDetail class..")

        this.service = new GtmProductDetailService(this.configs);
    }

    trackDetails(): boolean {
        let detailPageDiv: Element = document.querySelector(this.configs.detail.detailPageDiv);
        if (detailPageDiv == null) {
            this.helper.log("Aborting tracking details.. Not in details page..");
            return false;
        }

        let detailInfo: Element = document.querySelector(this.configs.detail.productDetailInfo);
        if (detailInfo == null) {
            this.helper.log("Aborting tracking details.. No product info..");
            return false;
        }

        this.helper.log("Reporting detail info to service...");
        this.service.trackProductDetail({
            id: (detailInfo as HTMLElement).dataset.ref,
            name: (detailInfo as HTMLElement).dataset.name,
            brand: (detailInfo as HTMLElement).dataset.brand,
            category: (detailInfo as HTMLElement).dataset.category,
            price: this.helper.formatPrice((detailInfo as HTMLElement).dataset.price)
        });

        return true;
    }

}