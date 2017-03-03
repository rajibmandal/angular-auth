(function () {
    'use strict';

    angular
        .module('authApp')
        .directive('toolbar', toolbar)
        .controller('toolbarController', toolbarController);

    function toolbar() {
        return {
            templateUrl: 'components/toolbar/toolbar.tpl.html',
            controller: toolbarController,
            controllerAs: 'toolbar'
        }
    }

    function toolbarController(auth, store, $location,$timeout) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.auth = auth;
       
        function login() {
            auth.signin({}, function (profile, token) {
            
                store.set('profile', profile)
                store.set('id_token', token);
            });
        }
        function logout() {
            store.remove('profile');
            store.remove('id_token');
            auth.signout();
            $location.path('/home');
        }
    }
})();