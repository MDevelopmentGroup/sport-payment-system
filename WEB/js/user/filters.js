var app=angular.module('VACANCY.Filters', []);
app.filter('VacancyType', function() {
    return function(input) {
        switch (input){
            case 1: return 'label-primary';
                break;
            case 2: return 'label-info';
                break;
            case 3: return 'label-warning';
                break;
            case 4: return 'label-success';
                break;
        }
    };
});
app.filter('SolutionSectorText', ['$rootScope', function($rootScope) {
    return function(input) {
        switch (input){
            case "0": return $rootScope.Page.Solution.Type.Finance;
                break;
            case "1": return $rootScope.Page.Solution.Type.Government;
                break;
            case "2": return $rootScope.Page.Solution.Type.Healthcare;
                break;
            case "3": return $rootScope.Page.Solution.Type.Other;
                break;
        }
    };
}]);
app.filter('EduLevelText', ['$rootScope', function($rootScope) {
    return function(input) {
        switch (input){
            case 0: return $rootScope.Page.Vacancy.EduLevelType.All; break;
            case 1: return $rootScope.Page.Vacancy.EduLevelType.Aspirant; break;
            case 2: return $rootScope.Page.Vacancy.EduLevelType.Bachelor; break;
            case 3: return $rootScope.Page.Vacancy.EduLevelType.Master; break;
            case 4: return $rootScope.Page.Vacancy.EduLevelType.PhD; break;
            case 5: return $rootScope.Page.Vacancy.EduLevelType.Specialist; break;
            case 6: return $rootScope.Page.Vacancy.EduLevelType.Student; break;
        }
    };
}]);

app.filter('isEduLevel', ['$rootScope', function($rootScope) {
    return function(input) {
        return input==="" ? "":$rootScope.Page.Vacancy.EduLevelLabel;        }
    //return input=="" ? input:$rootScope.Page.EduLevelLabel;

}]);

app.filter('CurrencyText', ['$rootScope', function($rootScope) {
    return function(input) {
        switch (input){
            case "": return ""; break;
            case null: return ""; break;
            case 1: return $rootScope.Page.Vacancy.CurrencyType.RUB; break;
            case 2: return $rootScope.Page.Vacancy.CurrencyType.USD; break;
            case 0: return $rootScope.Page.Vacancy.CurrencyType.EUR; break;
        }
    };
}]);

app.filter('StartSalaryText', ['$rootScope', function($rootScope) {
    return function(input) {
        return input=="" ? input:$rootScope.Page.Vacancy.From + input;        }

}]);
app.filter('EndSalaryText', ['$rootScope', function($rootScope) {
    return function(input) {
        return input=="" ? input:$rootScope.Page.Vacancy.To + input;        }

}]);
app.filter('isSalary', ['$rootScope', function($rootScope) {
    return function(input) {
        return input==="" ? "":$rootScope.Page.Vacancy.Salary;        }
    //return input=="" ? input:$rootScope.Page.EduLevelLabel;

}]);

app.filter('VacancyTypeText',['$rootScope', function($rootScope) {
    return function(input) {
        switch (input){
            case 1: return $rootScope.Page.Vacancy.Type.Full;
                break;
            case 2: return $rootScope.Page.Vacancy.Type.Underemployment;
                break;
            case 3: return $rootScope.Page.Vacancy.Type.Contract;
                break;
            case 4: return $rootScope.Page.Vacancy.Type.Freelance;
                break;
        }
    };
}]);
app.filter('isSite', ['$rootScope', function($rootScope) {
    return function(input) {
        return input=="" ? "":$rootScope.Page.Common.WebSite;        }

}]);
app.filter('isPhone', ['$rootScope', function($rootScope) {
    return function(input) {
        return input==null ? "":$rootScope.Page.Common.Phone;        }
}]);


app.filter('NoImage', function() {
    return function(input) {
        return input=="" ? 'NoImage.png':input;
    };
});
