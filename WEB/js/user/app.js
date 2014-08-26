angular.module('VACANCY',['ngCookies','gantt','ngResource','ngLocale', 'ngRoute','ngSanitize','ngAnimate','infinite-scroll',
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
        when('/Trainer/:Id',          {templateUrl: 'partials/user/view/view_Trainer.html', controller: ViewTrainerCtrl}).
        //***************************************** Trainer **********************************************************//

        when('/LK',                         {templateUrl: 'partials/user/view/view_School.html', controller: ViewLKCtrl}).

        //***************************************** Schools **********************************************************//

        when('/schools',                      {templateUrl: 'partials/user/view/view_Schools.html', controller: ViewSchoolsCtrl}).
        when('/school/:SchoolId',             {templateUrl: 'partials/user/view/view_School.html', controller: ViewSchoolCtrl}).
        when('/CreateSchool/',                {templateUrl: 'partials/user/Create/Create_School.html', controller: CreateSchoolCtrl}).
        when('/UpdateMySchool/',              {templateUrl: 'partials/user/Update/Update_School.html', controller: UpdateSchoolCtrl}).

        when('/MySchool/',                    {templateUrl: 'partials/user/view/My_School.html', controller: MySchoolCtrl}).
        when('/LessonInTimeTable/',           {templateUrl: 'partials/user/view/LessonInTimeTable.html', controller: LessonInTimeTableCtrl}).
        //***************************************** Schools **********************************************************//

        //***************************************** Invite **********************************************************//
        when('/Invite/:hash',                        {templateUrl: 'partials/user/view/InviteInstructor.html', controller: InviteCtrl}).
        when('/registryNewInstructor/:hash',         {templateUrl: 'partials/user/Create/registryNewInstructor.html', controller: registryNewInstructorCtrl}).
        //***************************************** Invite **********************************************************//


        //***************************************** PrivateLessons **********************************************************//
        when('/PrivateLessons',                   {templateUrl: 'partials/user/view/view_PrivateLessons.html', controller: ViewPrivateLessonsCtrl}).
        when('/PrivateLessons/:GroupId',          {templateUrl: 'partials/user/view/view_PrivateLesson.html', controller: ViewPrivateLessonsCtrl}).
        //***************************************** PrivateLessons **********************************************************//

        when('/main',             {templateUrl: 'partials/user/about.html' ,   controller: ViewAboutCtrl}).

        otherwise({redirectTo: '/main'});
    }])
    .run(['LanguageFactory',function(LanguageFactory) {
        LanguageFactory.Init();
       }])

    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd/MM/yyyy',
            startWeek: 1
        });
    })

    .config(function($timepickerProvider) {
        angular.extend($timepickerProvider.defaults, {
            timeFormat: 'HH:mm:ss',
            length: 4
        });
    })
;
