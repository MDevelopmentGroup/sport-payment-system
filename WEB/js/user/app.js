angular.module('VACANCY',['ngCookies','ngResource','ngLocale', 'ngRoute','ngSanitize','ngAnimate','infinite-scroll',
        'VACANCY.services','VACANCY.Filters','mgcrea.ngStrap','VACANCY.directive'
      ])
    .config(['$routeProvider',  function($routeProvider) { $routeProvider.

        when('/main',                     {templateUrl: 'partials/user/view/main.html',                  controller: ViewLKCtrl}).
        //***************************************** Balance **********************************************************//
        when('/Balance',                  {templateUrl: 'partials/user/view/view_Balance.html', controller: ViewBalanceCtrl}).
        //***************************************** Balance **********************************************************//

        //***************************************** TimeTable **********************************************************//
        when('/TimeTable',                {templateUrl: 'partials/user/view/view_TimeTable.html', controller: ViewTimeTableCtrl}).
        //***************************************** TimeTable **********************************************************//

        //***************************************** Groups **********************************************************//
        when('/Groups',                   {templateUrl: 'partials/user/view/view_Groups.html', controller: ViewGroupsCtrl}).
        when('/Groups/:GroupId',          {templateUrl: 'partials/user/view/view_Group.html', controller: ViewGroupsCtrl}).
        //***************************************** Groups **********************************************************//

        //***************************************** Trainer **********************************************************//
        when('/Trainers',                   {templateUrl: 'partials/user/view/view_Trainers.html', controller: ViewTrainerCtrl}).
        when('/Trainers/:GroupId',          {templateUrl: 'partials/user/view/view_Trainer.html', controller: ViewTrainerCtrl}).
        //***************************************** Trainer **********************************************************//

        when('/LK',                         {templateUrl: 'partials/user/view/view_School.html', controller: ViewLKCtrl}).

        //***************************************** Schools **********************************************************//

        when('/schools',                    {templateUrl: 'partials/user/view/view_Schools.html', controller: ViewSchoolsCtrl}).
        when('/schools/:GroupId',           {templateUrl: 'partials/user/view/view_School.html', controller: ViewSchoolsCtrl}).
        when('/Createschool/',                    {templateUrl: 'partials/user/Create/Create_Schools.html', controller: CreateSchoolCtrl}).
        //***************************************** Schools **********************************************************//

        //***************************************** PrivateLessons **********************************************************//
        when('/PrivateLessons',                   {templateUrl: 'partials/user/view/view_PrivateLessons.html', controller: ViewPrivateLessonsCtrl}).
        when('/PrivateLessons/:GroupId',          {templateUrl: 'partials/user/view/view_PrivateLesson.html', controller: ViewPrivateLessonsCtrl}).
        //***************************************** PrivateLessons **********************************************************//

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


        when('/main',             {templateUrl: 'partials/user/about.html' ,   controller: ViewAboutCtrl}).

        otherwise({redirectTo: '/main'});
    }]).
    run(['LanguageFactory',function(LanguageFactory) {
        LanguageFactory.Init();
       }]);
