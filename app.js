'use strict;'
//var auth0lock = require('auth0-lock');


angular.module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
.constant('appconst', {
    serverurl:'http://rajibmandal-001-site1.ctempurl.com'
})
.config(function (appconst, $provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, $locationProvider, jwtOptionsProvider) {

        authProvider.init({
            domain: 'angular-auth-rajib.auth0.com',
            clientID: 'Kn3BNciMcEWtWSFD1Gchy4v16sLZVcbk'
        });

        jwtInterceptorProvider.tokenGetter = function (store) {

            return store.get('id_token');
        }

        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.tpl.html',
                controller: 'homeController as home'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'components/profile/profile.tpl.html',
                controller: 'profileController as user'

            });



        jwtOptionsProvider.config({ whiteListedDomains: [appconst.serverurl] });
        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function ($rootScope, auth, store, jwtHelper, $location) {

        $rootScope.$on('$locationChangeStart', function () {
        
            var token = store.get('id_token');

            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            }
            else {
                $location.path('/home');
            }
        });
    });