(() => {
    'use strict';

    angular
        .module('app', [
            // Modules
            'app.home',

            // 3rd Party Modules
            'angular-ladda',
            'mgcrea.ngStrap',
            'duScroll',
            'braintree-angular',
            'ui.mask',

            // Angular Modules
            'ngSanitize',
            'ngAnimate'
        ])
        .constant('clientTokenPath', '/api/braintree-token')
        .config(appConfig);

    function appConfig($locationProvider, $compileProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        // Currently want debug info enabled!
        // $compileProvider.debugInfoEnabled(false);
    }
})();