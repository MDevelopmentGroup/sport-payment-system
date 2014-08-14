angular.module('VACANCY',['ngCookies','ngResource','ngLocale', 'ngRoute','ngSanitize','ngAnimate','infinite-scroll',
        'VACANCY.services','VACANCY.Filters','mgcrea.ngStrap','VACANCY.directive'
      ])
    .config(['$routeProvider',  function($routeProvider) { $routeProvider.

        when('/lk',                 {templateUrl: 'partials/user/view/lk.html',                  controller: ViewLKCtrl}).
        //***************************************** Vacancy **********************************************************//
        when('/vacancies',          {templateUrl: 'partials/user/view/view_vacancies.html', controller: ViewVacanciesCtrl}).
        when('/vacancy/:VacancyID', {templateUrl: 'partials/user/view/view_vacancy.html',   controller: ViewVacancyCtrl}).
        //***************************************** Vacancy **********************************************************//

        //***************************************** Company **********************************************************//
        when('/companies',          {templateUrl: 'partials/user/view/view_companies.html', controller: ViewCompaniesCtrl}).
        when('/company/:CompanyID', {templateUrl: 'partials/user/view/view_company.html',   controller: ViewCompanyCtrl}).
        //***************************************** Company **********************************************************//

        //***************************************** Event **********************************************************//
        when('/events',              {templateUrl: 'partials/user/view/view_events.html',     controller: ViewEventsCtrl}).
        when('/event/:EventID',      {templateUrl: 'partials/user/view/view_event.html',      controller: ViewEventCtrl}).
        //***************************************** Event **********************************************************//

        when('/catalog',            {templateUrl: 'partials/user/view/view_catalog.html',   controller: ViewCatalogCtrl}).
        when('/solution/:SolutionID',            {templateUrl: 'partials/user/view/view_solution.html',   controller: ViewSolutionCtrl}).


        when('/about',             {templateUrl: 'partials/user/about.html' ,   controller: ViewAboutCtrl}).

        otherwise({redirectTo: '/lk'});
    }]).
    run(['LanguageFactory',function(LanguageFactory) {
        LanguageFactory.Init();
       }]);
