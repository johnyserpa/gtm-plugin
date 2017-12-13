export class GtmProductDetailService {
    
        constructor(private configs: GtmPluginConfigs) {}
    
        /**
         * Method to track product detail page.
         * --- 
         * Tracks on event "productDetail".
         * ---
         * https://developers.google.com/tag-manager/enhanced-ecommerce#details
         * 
         * @param product 
         */
        trackProductDetail(product: ProductData): boolean {
            if (!product) throw new Error("Product must be passed as argument!");
    
            this.configs.dataLayer.push({
                event: "productDetail",
                ecommerce: {
                    currencyCode: this.configs.currency,
                    detail: {
                        products: [product]
                    }
                },
                productInfo: product
            })
    
            return true;
        }
    
    }