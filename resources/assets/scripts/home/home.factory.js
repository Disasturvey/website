(() => {
    'use strict';

    angular
        .module('app.home')
        .factory('HomeFactory', HomeFactory);

    function HomeFactory($http) {
        return {
            redeemNonce: redeemNonce,
            notifyPurchase: notifyPurchase
        };

        ////////////////

        function redeemNonce(nonce) {
            return $http.post('/api/redeem-nonce', {
                nonce: nonce
            });
        }


        function notifyPurchase() {
            return $http.post('http://10.205.252.119:3000/devices');
        }
    }

})();