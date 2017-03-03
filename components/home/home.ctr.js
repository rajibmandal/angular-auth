(function () {
    'use strict';

    angular
        .module('authApp')
        .controller('homeController', homeController);

function homeController(auth, store)
{
    var vm=this;
    vm.auth = auth;
    vm.profile = store.get('profile');

}


})();