angular.module('VACANCY',['ngCookies','ngResource','ngLocale', 'ngRoute','ngSanitize','ngAnimate','infinite-scroll',
        'VACANCY.services','VACANCY.Filters','mgcrea.ngStrap','VACANCY.directive'
      ])
    .config(['$routeProvider',  function($routeProvider) { $routeProvider.


        when('/lk',                 {templateUrl: 'partials/user/view/lk.html',                  controller: ViewLKCtrl}).



        when('/about',             {templateUrl: 'partials/user/about.html' ,   controller: ViewAboutCtrl}).

        otherwise({redirectTo: '/lk'});
    }]).
    run(['LanguageFactory',function(LanguageFactory) {
        LanguageFactory.Init();
       }]);