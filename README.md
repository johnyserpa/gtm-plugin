# Google Tag Manager Integration

E-commerce GTM Wrapper focused on minimal configuration and out of the box tracking.

**Events**:
* Impressions and clicks - auto-tracking
* Detail view - auto-tracking
* Add and remove from cart - tracking by method
* Initiate checkout and checkout steps - auto tracking
* Transaction - auto tracking

### Understanding HTML structure

#### Listing

![Listing HTML Structure](https://preview.ibb.co/dY6RKm/listing.png)

#### Detail

![Detail HTML Structure](https://image.ibb.co/giVWkR/detail.png)

#### Cart

![Cart HTML Structure](https://image.ibb.co/bT6RKm/cart.png)

#### Checkout

![Checkout HTML Structure](https://image.ibb.co/hEnBkR/checkout.png)

#### Transaction

![Transaction HTML Structure](https://image.ibb.co/eQoHQR/transaction.png)


## Getting Started

* Clone the project
* Install dependencies ```npm i```
* Build it ```npm run build```

### Prerequisites

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

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **jserpa** - *Initial work* - [Github](https://github.com/johnyserpa)

## Acknowledgments

* Based on [georgwittberger's jquery plugin](https://github.com/georgwittberger/jquery-plugin-typescript-example).
