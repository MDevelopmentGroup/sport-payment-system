/**
 * Created by Victor77 on 26.02.14.
 */

var app=angular.module('VACANCY.config', [])
    .run(['$rootScope', function($rootScope) {
        // опции для автозаполнения

        $rootScope.streetOptions={
            types: 'geocode',
            country: 'ru',
            watchEnter: true
        };
        $rootScope.cityOptions = {
            types: '(cities)',
            // country: 'ru',
            watchEnter: true
        };

    }
    ])