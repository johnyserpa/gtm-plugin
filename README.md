# Requirements
* JS

## How to use

* If we are going to interact with the plugin in almost every page, plugin class should be instanciated once at the page load.

    ```var gtmplugin = new LVGtmPlugin.GtmPlugin(window.dataLayer, "EUR");```

* After this, we can reference to the ```window.gtmplugin``` variable and call its methods.

        window.gtmplugin.trackProductClick($(this).closest('.gtm-listagem').data('list'), {
          list: $(this).closest('.gtm-listagem').data('list'),
          ref: $gtm.ref,
          name: $gtm.name,
          price: $gtm.price,
          brand: $gtm.brand,
          category: $gtm.category,
          position: $(this).closest('.gtm-listagem').find('.prod').index($(this).closest('.prod'))
        });
