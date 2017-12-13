# Requirements
* JS

## How to develop

* ```npm run build``` triggers typescript compiler, rollup and docs generator.

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

## 


# Google Tag Manager Integration

Layer between website and GTM.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* nodejs
* npm

### Installing

* Clone the project
* ```cd``` into it and ```npm i```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

    npm run build

This will:
* Transpile typescript to javascript
* 

Instanciate global var:

    ```var gtmplugin = new LVGtmPlugin.GtmPlugin(window.dataLayer, "EUR");```

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
