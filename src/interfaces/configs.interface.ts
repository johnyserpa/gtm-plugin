/**
 * Configs for GTM Plugin.
 */
interface GtmPluginConfigs {
    /**
     * Debug option.
     */
    debug: boolean;
    /**
     * DataLayer reference.
     */
    dataLayer: any;
    /**
     * Currency.
     * Example: "EUR", "USD".
     */
    currency: string;
    /**
     * Impresssions and Clicks configurations.
     */
    impressionsAndClicks: ImpressionsAndClicksConfigs;
    /**
     * Product Detail configurations.
     */
    detail: ProductDetailConfigs;
}

/**
 * Impressions and Clicks configs.
 */
interface ImpressionsAndClicksConfigs {
    /**
     * About product impressions.
     */
    status: boolean;
    listSelector: string;
    productDivSelector: string;
    productLinkSelector: string;
    productInfoSelector: string;
}

/**
 * Product Detail configs.
 */
interface ProductDetailConfigs {
    status: boolean;
    detailPageDiv: string;
    productDetailInfo: string;
}

/**
 * Add to and remove from cart configs. 
 */
interface AddAndRemoveFromCartConfigs {
    status: boolean;
}