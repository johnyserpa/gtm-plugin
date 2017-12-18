# Google Tag Manager Integration

E-commerce GTM Wrapper focused on minimal configuration and out of the box tracking.

## Events and Data Layer exposed variables

Events must be created as triggers in GTM.

### Impressions and clicks

#### Data: 

* listSelector:
    * name
* productInfoSelector:
    * id
    * name
    * price
    * brand
    * category

#### Impressions
* Event: **productImpressions** - auto-tracking
* dataLayer:

        currencyCode: string,
        impressions: ProductData[]

#### Clicks 
* Event: **productClick** - auto-tracking
* dataLayer:

        currencyCode: string,
        click: {
            actionField: {
                list: string
            },
            products: ProductData[]
        }

### Detail view

#### Data

* productInfoSelector:
    * id
    * name
    * price
    * brand
    * category

#### Detail 
* Event: **productDetail** - auto-tracking
* dataLayer:

        currencyCode: string,
        click: {
            products: ProductData[]
        },
        productInfo: ProductData

* You can add extra data to be scrapped from the div dataset by using the extra field.
    * select extra data fields by passing a string array

### Add and remove from cart

#### Data

* addToCart/removeFromCart
    * id
    * name
    * price
    * brand
    * category
    * variant
    * quantity

#### Add to cart
* Event: **addToCart** - tracking by method
* dataLayer: 

        ecommerce: {
            currencyCode: string,
            add: {
                products: ProductData[]
            }
        },
        productInfo: ProductData

#### Remove from cart
* Event: **removeFromCart** tracking by method
* dataLayer:

        ecommerce: {
            currencyCode: string,
            remove: {
                products: ProductData[]
            }
        },
        productInfo: ProductData

### Iniitiate checkout and checkout steps

#### Data

* checkoutStepSelector:
    * step
* productInfoSelector:
    * id
    * name
    * price
    * brand
    * category
    * variant
    * quantity

#### Initiate Checkout
* Event: **initiateCheckout** - auto-tracking
* dataLayer:

        ecommerce: {
            currencyCode: string,
            checkout: {
                actionField: {
                    step: number
                },
                products: ProductData[]
            },
            productIds: number[],
            productCount: number,
            productSumPrices: number
        }

#### Checkout steps
* Event: **checkout** - auto-tracking
* dataLayer:

        ecommerce: {
            currencyCode: string,
            checkout: {
                actionField: {
                    step: number
                }
            }
        }

### Transaction

#### Data
* transactionInfoSelector:
    * id
    * revenue
    * tax
    * shipping
    * products[]:
        * id
        * name
        * price
        * brand
        * category
        * variant
        * quantity

* Event: **transaction** - auto tracking
* dataLayer:

        transaction: transactionData,
        products: productData[]

## HTML structure

### Listing

![Listing HTML Structure](https://preview.ibb.co/gwb7s6/Screenshot_from_2017_12_15_15_30_42.png" alt="Screenshot from 2017 12 15 15 30 42)

### Detail

![Detail HTML Structure](https://image.ibb.co/giVWkR/detail.png)

### Cart

![Cart HTML Structure](https://image.ibb.co/bT6RKm/cart.png)

### Checkout

![Checkout HTML Structure](https://image.ibb.co/hEnBkR/checkout.png)

### Transaction

![Transaction HTML Structure](https://image.ibb.co/eQoHQR/transaction.png)

## Getting Started

* Clone the project
* Install dependencies ```npm i```
* Build it ```npm run build```

### Prerequisites

* Google Analytics Enhanced Ecommerce
* Google Tag Manager
* nodejs
* npm
* typescript

## Deployment

    npm run build

This will create a dist folder with a **bundle.min.js** file with all the code to be included.

## How to use

Examples:

### Instanciate GtmWrapper class and configure it.

    var gtmWrapper = new LVGtmPlugin.GtmWrapper({
        debug: true,
        dataLayer: window.dataLayer,
        currency: "EUR",
        impressionsAndClicks: {
            status: true,
            listSelector: ".gtm-listing",
            productContainerSelector: ".gtm-product-box",
            productInfoSelector: ".gtm-product-info",
            productLinkSelector: ".gtm-product-link",
        },
        detail: {
            status: true,
            detailPageSelector: "#gtm-detail",
            productInfoSelector: "#gtm-detail-product-info",
            extra: ["stock", "something"]
        },
        cart: {
            status: true
        },
        checkout: {
            status: true,
            checkoutInitiateSelector: "#gtm-cart",
            checkoutStepSelector: ".#gtm-checkout",
            productInfoSelector: ".gtm-product-cart-info"
        },
        transaction: {
            status: true,
            transactionInfoSelector: "#gtm-transaction"
        }
    });

### Add to cart 

    function addToCart() {
        gtmWrapper.addToCart({
            ref: '123-ABC',
            name: 'Product 1',
            price: '21.00', // Desired format 
            brand: 'NIKE',
            category: 'Shoes',
            variant: 'black_45',
            quantity: '1'
        });
    }

### Remove from cart

    function removeFromCart() {
        gtmWrapper.removeFromCart({
            ref: '123-ABC',
            name: 'Product 1',
            price: '21.00', // Desired format 
            brand: 'NIKE',
            category: 'Shoes',
            variant: 'black_45',
            quantity: '1'
        });
    }
## Built with

* babel
* rollup
* uglify
* karma & jasmine (optional)

## Contributing

Feel free to contribute :)

## Versioning

Trying to use [SemVer](http://semver.org/) for versioning. 

## Authors

* **jserpa** - *Initial work* - [Github](https://github.com/johnyserpa)

## Acknowledgments

* Based on [georgwittberger's jquery plugin](https://github.com/georgwittberger/jquery-plugin-typescript-example).
