angular.module('demo', ["googleApi"])
    .config(function(googleLoginProvider) {
        googleLoginProvider.configure({
            clientId: '86505345915-tona9tmk5psjo12mofogm730dnu2jeaa.apps.googleusercontent.com',
            scopes: ["https://www.googleapis.com/auth/calendar"]
        });
    })
    .controller('DemoCtrl', ['$scope', 'googleLogin', 'googleCalendar', function ($scope, googleLogin, googleCalendar) {

        $scope.login = function () {
            googleLogin.login();
        };

        $scope.loadEvents = function() {
            this.calendarItems = googleCalendar.listEvents({calendarId: this.selectedCalendar.id});
        };

        $scope.loadCalendars = function() {
            $scope.calendars = googleCalendar.listCalendars();
        };

    }]);
