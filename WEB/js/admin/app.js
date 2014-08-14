/**
 * Created by Victor77 on 10.12.13.
 */
angular.module('Dance',['ngCookies','ngResource','ngLocale', 'ngRoute','ngSanitize','mgcrea.ngStrap','ngGrid',
        'Dance.services', 'Dance.Filters','Dance.directive'
    ])
    .config(['$routeProvider',  function($routeProvider) { $routeProvider.
        //***************************************** User **********************************************************//
        when('/users',                  {templateUrl: 'partials/admin/view/view_users.html',  access:'1', controller: ViewUsersCtrl}).
        when('/createuser',             {templateUrl: 'partials/admin/CRUD/CRUD_user.html',   access:'1', controller: CreateUserCtrl}).
        when('/updateuser/:ID',         {templateUrl: 'partials/admin/CRUD/CRUD_user.html',   access:'1', controller: UpdateUserCtrl}).
        //***************************************** User **********************************************************//

        //***************************************** School **********************************************************//
        when('/schools',                 {templateUrl: 'partials/admin/view/view_schools.html',  access:'1', controller: ViewSchoolsCtrl}).
        when('/createschool',            {templateUrl: 'partials/admin/CRUD/CRUD_school.html',   access:'1', controller: CreateSchoolCtrl}).
        when('/updateschool/:ID',        {templateUrl: 'partials/admin/CRUD/CRUD_school.html',   access:'1', controller: UpdateSchoolCtrl}).
        //***************************************** School **********************************************************//



        otherwise({redirectTo: '/title'});
    }])
    .run(['$rootScope', '$location','AuthenticationFactory','LanguageFactory', function ($rootScope,$location,AuthenticationFactory,LanguageFactory) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
          if(AuthenticationFactory.GetAccessLevels(next.access)){}
          else{
            //$location.path('/title');
          }
        });
        LanguageFactory.Init();
    }])
    .run(['$rootScope','LanguageFactory', function($rootScope,LanguageFactory) {
    }
    ]);