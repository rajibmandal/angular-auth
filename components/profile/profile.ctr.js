(function () {
    'use strict';

    angular
        .module('authApp')
        .controller('profileController', profileController);

    function profileController($http, store, appconst) {
        var vm = this;
        vm.getMessage = getMessage;
        vm.getSecretMessage = getSecretMessage;
        vm.message;
        vm.hostserver=appconst.serverurl;
        //console.log(vm.hostserver);
        vm.profile = store.get('profile');

        function getMessage()
        {
            $http.get(appconst.serverurl+'/api/public', {
            skipAuthorization:'true'
            }).then(function(response){
                vm.message = response.data;
                console.log(response);
            }, function(eror){
                console.log(eror);
            });
            
        }

        function getSecretMessage()
        {
              $http({
                    url: appconst.serverurl+'/api/private',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.get('id_token')
                    }
                }).then(function (response) {
                    vm.message = response.data;
                    console.log(response.data);
                }, function (response) {
                    console.log(eror);
                });           





/*
            $http.get('http://localhost:5001/api/private')
            .then(function(response){
                vm.message = response.data.message;
            }, function(eror){
                console.log(eror);
            });
 */           
        }

    }
})();