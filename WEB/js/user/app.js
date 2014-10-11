angular.module('VACANCY',['ngCookies','gantt','ngResource','ngLocale', 'ngRoute','ngSanitize','ngAnimate','infinite-scroll',
        'VACANCY.services','VACANCY.Filters','mgcrea.ngStrap','VACANCY.directive','googleApi','ja.qr'
      ])
    .config(['$routeProvider',  function($routeProvider) { $routeProvider.

        when('/main',                     {templateUrl: 'partials/user/view/main.html',                  controller: ViewLKCtrl}).
        //***************************************** Balance **********************************************************//
        when('/Balance',                  {templateUrl: 'partials/user/view/view_Balance.html', controller: ViewBalanceCtrl}).
        //***************************************** Balance **********************************************************//

        //***************************************** TimeTable **********************************************************//
        when('/TimeTable',                {templateUrl: 'partials/user/view/view_TimeTable.html', controller: ViewTimeTableCtrl}).
        //***************************************** TimeTable **********************************************************//

        //***************************************** Dancer ********************************************************//

        when('/UpdateUser/',            {templateUrl: 'partials/user/view/view_TimeTable.html', controller: UpdateDancerCtrl}).
        //***************************************** Dancer ********************************************************//

        //***************************************** Groups **********************************************************//
        when('/Groups',                   {templateUrl: 'partials/user/view/view_Groups.html', controller: ViewGroupsCtrl}).
        when('/Groups/:GroupId',          {templateUrl: 'partials/user/view/view_Group.html', controller: ViewGroupsCtrl}).
        //***************************************** Groups **********************************************************//

        //***************************************** Trainer **********************************************************//
        when('/Trainers',                   {templateUrl: 'partials/user/view/view_Trainers.html', controller: ViewTrainersCtrl}).
        when('/Trainer/:ID',                {templateUrl: 'partials/user/view/view_Trainer.html', controller: ViewTrainerCtrl}).
        when('/UpddateTrainer/',            {templateUrl: 'partials/user/Update/UpdateInstructor.html', controller: UpdateInstructorCtrl}).
        //***************************************** Trainer **********************************************************//

        when('/LK/:ID',                         {templateUrl: 'partials/user/view/LK.html', controller: ViewLKCtrl}).

        //***************************************** Schools **********************************************************//

        when('/schools',                      {templateUrl: 'partials/user/view/view_Schools.html', controller: ViewSchoolsCtrl}).
        when('/school/:ID',                     {templateUrl: 'partials/user/view/view_School.html', controller: ViewSchoolCtrl}).
        when('/CreateSchool/',                {templateUrl: 'partials/user/Create/Create_School.html', controller: CreateSchoolCtrl}).
        when('/UpdateMySchool/',              {templateUrl: 'partials/user/Update/Update_School.html', controller: UpdateSchoolCtrl}).
        when('/LessonTypes/',              {templateUrl: 'partials/user/View/View_LessonTypes.html', controller: LessonTypesCtrl}).
        when('/Semester/',              {templateUrl: 'partials/user/View/View_Semester.html', controller: SemesterCtrl}).
        when('/IIS/',              {templateUrl: 'partials/user/View/View_IIS.html', controller: InstructorInSchoolsCtrl}).

        when('/MySchool/',                    {templateUrl: 'partials/user/view/My_School.html', controller: MySchoolCtrl}).
        when('/LessonInTimeTable/:ID',           {templateUrl: 'partials/user/view/view_LessonInTimeTable.html', controller: LessonInTimeTableCtrl}).
        when('/JournallLessons/:ID',          {templateUrl: 'partials/user/view/JournallLessons.html', controller: JournallLessonsCtrl}).
        when('/SubscriptionList/:ID',          {templateUrl: 'partials/user/view/view_Subscriptions.html', controller: ViewSubscriptionsCtrl}).
        when('/SubscriptionList/:ID/:IDS',      {templateUrl: 'partials/user/view/view_Subscription.html', controller: ViewSubscriptionCtrl}).
        when('/SubscriptionList/:ID/:IDS/:IDJL',      {templateUrl: 'partials/user/view/view_Subscription.html', controller: ViewSubscriptionCtrl}).
        when('/CreateSubscription/:ID',          {templateUrl: 'partials/user/Create/create_Subscription.html', controller: CreateSubscriptionsCtrl}).
        when('/UpdateSubscription/:ID',          {templateUrl: 'partials/user/Update/Update_SubscriptionList.html', controller: UpdateSubscriptionsCtrl}).
        when('/schedule/:ID',                   {templateUrl: 'partials/user/view/View_Schedule.html', controller: ScheduleCtrl}).
        when('/Subscription/:Sole',      {templateUrl: 'partials/user/view/view_UserSubscription.html', controller: ViewUserSubscriptionCtrl}).

        //***************************************** Schools **********************************************************//

        //***************************************** Invite **********************************************************//
        when('/Invite/:hash',                        {templateUrl: 'partials/user/view/InviteInstructor.html', controller: InviteCtrl}).
        when('/registryNewInstructor/:hash',         {templateUrl: 'partials/user/Create/registryNewInstructor.html', controller: registryNewInstructorCtrl}).
        //***************************************** Invite **********************************************************//
        when('/success/:DateTransactionInit/:outSum/:email',                {templateUrl: 'partials/user/view/Wait.html', controller: successCtrl}).
        when('/success/:FirstName/:LastName/:Patronymic/:DateTransactionInit/:OutSum',   {templateUrl: 'partials/user/view/FailUrl.html', controller: FailUrlCtrl}).

        //***************************************** PrivateLessons **********************************************************//
        when('/PrivateLessons',                   {templateUrl: 'partials/user/view/view_PrivateLessons.html', controller: ViewPrivateLessonsCtrl}).
        when('/PrivateLessons/:GroupId',          {templateUrl: 'partials/user/view/view_PrivateLesson.html', controller: ViewPrivateLessonsCtrl}).


        //***************************************** PrivateLessons **********************************************************//

        when('/main',             {templateUrl: 'partials/user/about.html' ,   controller: ViewAboutCtrl}).

        otherwise({redirectTo: '/schedule/55'});
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
    .directive("testsum",function(){

        return {
            restrict: 'AEC',
            scope:{
                ngModel:"=",
                testsum:"="
            },
            link:function (scope, element, attrs){
                scope.$watch("ngModel",function(){
                        scope.temp? "адын,адын,адын":scope.temp="";
                        var regEx=new RegExp(scope.testsum);
                        if (!(regEx.test(scope.ngModel))){
                            console.log(scope.testsum);
                            if (scope.ngModel) {
                                scope.ngModel = scope.temp;
                            }
                            else{
                                scope.temp="";
                                scope.ngModel="";
                            }
                        }
                        else{
                            scope.temp=scope.ngModel;
                        }

                    }
                )
            }
        };
    })

/*
    .config(function(googleLoginProvider) {
        googleLoginProvider.configure({
            clientId: '86505345915-njjhdgp192t707kgm74pumc02vg8a0fq.apps.googleusercontent.com',
            scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar"]
        });
    })
    */
    /*
    .value('GoogleApp', {
        apiKey: 'AIzaSyBBcA_ertE9wwJeLhgYXSsYFGfioRFBb-A',
        'client_id': '86505345915-8tii7mbgjc3ohns72lf8nng7hm81b4uu.apps.googleusercontent.com',
        scopes: [
            // whatever scopes you need for your app, for example:
            //'https://www.googleapis.com/auth/calendar',
            //'https://www.googleapis.com/auth/calendar.readonly'
            // ...
        ]
    })*/
;
