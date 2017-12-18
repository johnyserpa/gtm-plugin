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
    /**
     * Add and Remove from Cart configurations.
     */
    cart: AddAndRemoveFromCartConfigs;
    /**
     * Checkout configurations.
     */
    checkout: CheckoutConfigs;
    /**
     * Transaction configurations.
     */
    transaction: TransactionConfigs;
}

/**
 * Impressions and Clicks configs.
 */
interface ImpressionsAndClicksConfigs {
    /**
     * Status.
     */
    status: boolean;
    /**
     * The list css selector.
     */
    listSelector: string;

    /**
     * Product container css selector.
     */
    productContainerSelector: string;
    /**
     * Product links css selector.
     */
    productLinkSelector: string;
    /**
     * Product information css selector.
     */
    productInfoSelector: string;
}

/**
 * Product Detail configs.
 */
interface ProductDetailConfigs {
    /**
     * Status.
     */
    status: boolean;
    /**
     * Detail page identifier css selector.
     */
    detailPageSelector: string;
    /**
     * Product information css selector.
     */
    productInfoSelector: string;
    /**
     * Extra data to scrap from div with data.
     */
    extra: string[];
}

/**
 * Add to and remove from cart configs. 
 */
interface AddAndRemoveFromCartConfigs {
    /**
     * Status.
     */
    status: boolean;
}

/**
 * Checkout configs.
 */
interface CheckoutConfigs {
    /**
     * Status.
     */
    status: boolean;
    /**
     * Initiate checkout css selector.
     */
    checkoutInitiateSelector: string;
    /**
     * Checkout step css selector.
     */
    checkoutStepSelector: string;
    /**
     * Product information css selector.
     */
    productInfoSelector: string;
}

/**
 * Transaction configs.
 */
interface TransactionConfigs {
    /**
     * Status.
     */
    status: boolean;
    /**
     * Transaction info css selector.
     */
    transactionInfoSelector: string;
}