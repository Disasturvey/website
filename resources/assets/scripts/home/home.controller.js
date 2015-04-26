(() => {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    function HomeController(HomeFactory, $braintree) {
        var vm = this,
            client;

        vm.card = {
            number: '',
            expiry: '',
            engraving: ''
        };

        vm.processPayment = processPayment;

        vm.loading = {
            braintree: true,
            payment: false
        };

        vm.done = false;

        vm.masks = {
            generic: '9999 9999 9999 9999',
            amex: '9999 999999 99999'
        };

        vm.selectedMask = vm.masks.generic;

        vm.amount = 40;

        init();

        ////////////////

        function init() {
            $braintree.getClientToken().success(function(token) {
                client = new $braintree.api.Client({
                    clientToken: token
                });
            });
        }

        function processPayment() {
            vm.loading.payment = true;

            var params = {
                number: vm.creditCard.number,
                expirationDate: vm.creditCard.expiry.substr(0,2) + '/' + vm.creditCard.expiry.substr(2,2)
            };

            client.tokenizeCard(params, function (err, nonce) {
                if (err) {
                    vm.loading.payment = false;
                    console.log(err);
                    return;
                }

                HomeFactory.redeemNonce(nonce, vm.amount).then(function(res) {
                    vm.loading.payment = false;
                    vm.done = true;
                    HomeFactory.notifyPurchase();
                });
            });

        }
    }
})();