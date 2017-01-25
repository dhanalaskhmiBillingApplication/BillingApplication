/**
 * Created by dhanalakshmi on 25/1/17.
 */
var dependencies = ['ui.router'];
var billApp = angular.module("billApp", dependencies);

billApp.run(function(companyService,clientService,productService){
    companyService.getCompanyJsonConfig().then(function (resultDetails) {
        companyService. setCompanyFromConfig(resultDetails.data)
        getClientJsonConfig();
        getProductJsonConfig();

    }, function error(errResponse) {
        console.log("cannot get settings config")
    })

    function getClientJsonConfig(){
        clientService.getClientJsonConfig().then(function (resultDetails) {
            clientService. setClientFromConfig(resultDetails.data)
            console.log(clientService.getClientFromConfig())

        }, function error(errResponse) {
            console.log("cannot get settings config")
        })

    }

    function getProductJsonConfig(){
        productService.getProductJsonConfig().then(function (resultDetails) {
            productService. setProductFromConfig(resultDetails.data)
            console.log(productService.getProductFromConfig())
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })

    }
});


billApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('application', {
            url: "/application",
            templateUrl: 'templates/app.html'
        })
       .state('application.home', {
            url: "/home",
            templateUrl: 'templates/home.html'
        })
          .state('application.client', {
            url: "/client",
            templateUrl: 'templates/client.html'
        })

        /* .state('application.Products', {
            url: "/Products",
            templateUrl: 'templates/Products.html',
            controller:'productCtrl'
        })
        .state('application.settings', {
            url: "/settings",
            templateUrl: 'templates/settings.html',
            controller:'settingsCtrl'
        })
        .state('application.invoice', {
            url: "/invoice",
            templateUrl: 'templates/invoice.html',
            controller:'invoiceCtrl'
        })*/
    $urlRouterProvider.otherwise("/application");
});
