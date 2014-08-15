


//***************************************** Authentication ***********************************************//
//***************************************** Authentication ***********************************************//


//******************************************* Vacancy Start **********************************************************//
function ViewLKCtrl($scope,$rootScope,$modal,LanguageFactory,AuthenticationFactory,PaymentFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/main.html';
        $rootScope.MenuActive.Controller='ViewLKCtrl';
        $scope.User=AuthenticationFactory.GetCurrentUser();
        //$rootScope.MenuActive.SettingsView='active';
        $scope.lang=LanguageFactory.GetCurrentLanguage();
    }
    $scope.Payment=function(){
        var data={};
        data.UserId=$scope.User.ID;
        data.HASH=$scope.User.HASH;
        PaymentFactory.Init(data).success(function(data){
            if(data.urlPay) {
                console.log(data.urlPay);
                location=data.urlPay;
            };
        });
    };
    $scope.init();
}
function NavBarCtrl($scope,$rootScope,$modal,LanguageFactory,AuthenticationFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/navbar_tabmenu.html';
        $rootScope.MenuActive.Controller='NavBarCtrl';
        //$rootScope.MenuActive.SettingsView='active';
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        $scope.GetUser();
        $scope.Visible();
        $rootScope.filterLang=LanguageFactory.GetLanguage();
        $scope.User=AuthenticationFactory.GetCurrentUser();
        $scope.Name=AuthenticationFactory.GetCurrentUser().UserName;
        $scope.HASH=AuthenticationFactory.GetCurrentUser().HASH;
        $scope.Items.Menu=0;
    };

    $scope.Auth=function(){

    }

    $scope.SetLanguage=function(lang){
        $scope.lang=lang;
        $rootScope.siteLang=lang;
        //console.log( $rootScope.filterLang);
        LanguageFactory.SetDefaultLanguage(lang);
        LanguageFactory.Init();
        $rootScope.filterLang=LanguageFactory.GetLanguage();
    };
    $scope.GetUser=function(){
        $scope.User={};
        $scope.User.UserName=AuthenticationFactory.GetCurrentUser().UserName;
        $scope.User.UserImage=AuthenticationFactory.GetCurrentUser().UserImage;
        $scope.User.ID=AuthenticationFactory.GetCurrentUser().ID;

    };
    $scope.Visible=function(){
        $scope.Items={};
        // $rootScope.Items.Menu=false;
        if(AuthenticationFactory.GetCurrentUser().UserName!=null){
            $scope.Items.Menu=true;
        }
        else{
            $scope.Items.Menu=false;
        }
    };
    $scope.Login=function(){
        $scope.data={};
        $scope.data.ok=function(data){
            AuthenticationFactory.Login(data).success(function(data){
                $scope.success=data.children;
                if($scope.success){
                    Modal.hide();
                    //$scope.init();
                    //location.reload();
                    $scope.User.ID=data.UserID;
                    $scope.User.Login=data.Login;
                    $scope.init();
                }
                else {
                    $scope.data.status='<div class="alert alert-danger">'+$rootScope.Page.Modal.Success+'</div>';
                }
            });
        };
        var Modal = $modal({scope:$scope,show:true,backdrop:false,template:'partials/user/modal/modal_login.html'});
    };
    $scope.Logout=function(){
        AuthenticationFactory.Logout().success(function(){
            //$scope.init();
            //location.reload();
        });
    };
    $scope.init();
}
function ViewVacanciesCtrl($rootScope,$scope,$timeout,  VacancyFactory,$location, $anchorScroll, CompanyFactory,SettingFactory,LanguageFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_vacancies.html';
        $rootScope.MenuActive.Controller='ViewVacanciesCtrl';
        $rootScope.MenuActive.VacanciesView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Vacancy.Title;
        $scope.GetVacancies();
        $scope.GetCompanyWidget();
        $scope.GetVacancyCityList();
        $scope.GetCompaniesList();
        $scope.dddd=0;
        SettingFactory.GetSettings();

    };

    $scope.gotoTop = function (){
        $location.hash('top');
        $anchorScroll();
    }
    $scope.gotoBottom = function (){
        $location.hash('bottom');
        $anchorScroll();
    }

    $scope.StartSlider=function(){
        $scope.cancelRefresh=$timeout(doSomething, 3500 );
    };
    $scope.StopSlider=function(){
        $timeout.cancel($scope.cancelRefresh);
    };

    function doSomething() {
// TODO: переключает картинки
            switch($scope.dddd){
                case "1":
                    $scope.dddd = "2";
                    break;
                case "2":
                    $scope.dddd = "3";
                    break;
                case "3":
                    $scope.dddd = "4";
                    break;
                default:
                    $scope.dddd = "1";
            }

        $scope.cancelRefresh=$timeout(doSomething, 3500 );
    }
    $scope.cancelRefresh=$timeout(doSomething, 3500 );

    $scope.GetVacancies=function(){
        VacancyFactory.GetVacancies('0').success(function(data){
            $scope.vacancies=data.children;
        });

    };
    $scope.id=0;
    $scope.addMoreItems=function(){
        $scope.id+=1;
        if($scope.data.length<60){
        for(i=0;i<8;i++){
        $scope.data.push({});}}
        console.log($scope.id);
    };

    $scope.GetCompaniesList=function(){
        CompanyFactory.GetCompaniesSelect().success(function(data){
           $scope.companiesList=data.children;
        });
    };
    $scope.GetCompanyWidget=function(){
        CompanyFactory.GetCompanyWidget().success(function(data){
            $scope.companiesWidget=data.children;
        });
    };
    $scope.GetVacancyCityList=function(){
        VacancyFactory.GetVacancyCityList().success(function(data){
            $scope.vacancyCityList=data.children;
        });
    };
    $scope.init();
}

function ViewVacancyCtrl($rootScope,$scope,$modal,$routeParams,VacancyFactory,ResponseFactory,SettingFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_vacancy.html';
        $rootScope.MenuActive.Controller='ViewVacancyCtrl';
        $rootScope.MenuActive.VacanciesView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Vacancy.Title;
        $scope.GetVacancy($routeParams.VacancyID);
        $scope.EduLevelTXT ="";
        $scope.SalaryTXT = "";
        SettingFactory.GetSettings();
    };

    $scope.GetVacancy=function(VacancyID){
        VacancyFactory.GetVacancy(VacancyID).success(function(data){
            $scope.vacancy=data.children;
            var address = $scope.vacancy[0].Street;
            $scope.vacancy[0].Links? $scope.links=JSON.parse($scope.vacancy[0].Links):null;
            //var myGeocoder = ymaps.geocode($scope.vacancy[0].City,{ results: 1 });//
            var myGeocoder = ymaps.geocode(address,{ results: 1 });//
            myGeocoder.then(
                function (res) {


                    myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
                        hintContent: $scope.vacancy[0].Name
                        //balloonContent: 'Столица России'
                    });

                    var map=new ymaps.Map ("map", {
                        center: res.geoObjects.get(0).geometry.getCoordinates(),
                        zoom: 10
                    });

                    map.geoObjects.add(myPlacemark);
                },function (err){

                });
        });
    };
/*
    $scope.SetTextFields=function(){
 // инициируем зарплаты и уровень образования
 var Salary = $rootScope.Page.Vacancy.Salary;
 if ($scope.vacancy[0].StartSalary !=""){Salary = Salary + " "+ $rootScope.Page.Vacancy.From + " " + $scope.vacancy[0].StartSalary}
 if ($scope.vacancy[0].EndSalary !=""){Salary = Salary + " "+ $rootScope.Page.Vacancy.To + " " + $scope.vacancy[0].EndSalary}
 if (Salary != $rootScope.Page.Vacancy.Salary) {$scope.SalaryTXT =Salary;}
 if ($scope.vacancy[0].EduLevel !=""){$scope.EduLevelTXT = $rootScope.Page.Vacancy.EduLevelLabel + " " + $scope.vacancy[0].EduLevel}
    };
*/
    $scope.Response=function(data){

        $scope.data=data;
        $scope.response={};
        $scope.response.City="";
        $scope.response.Country="";
        ymaps.ready(init);
        function init() {
            // Данные о местоположении, определённом по IP
            var geolocation = ymaps.geolocation;
            $scope.response.City = geolocation.city;
            $scope.response.Country= geolocation.country;
        }
        $scope.data.ok=function(result){
            result.VacancyID=$scope.data.ID;
            ResponseFactory.CreateResponse(result);
        };
        var Modal = $modal({scope:$scope,show:true,backdrop:false,template:'partials/user/create/create_response.html'});
    };
    $scope.init();
}

//******************************************* Vacancy End ************************************************************//

//******************************************* Company Start **********************************************************//
function ViewCompaniesCtrl($rootScope,$scope,CompanyFactory,SettingFactory,LanguageFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_companies.html';
        $rootScope.MenuActive.Controller='ViewCompaniesCtrl';
        $rootScope.MenuActive.CompaniesView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Company.Title;
        SettingFactory.GetSettings();
        $scope.GetCompanies();
        $scope.GetCompanyCityList();


    };
    $scope.GetCompanies=function(){
        CompanyFactory.GetCompanies().success(function(data){
            $scope.companies=data.children;
        });
    };
    $scope.GetCompanyCityList=function(){
        CompanyFactory.GetCompanyCityList().success(function(data){
            $scope.companyCityList=data.children;
        });
    };

    $scope.init();
}
function ViewCompanyCtrl($rootScope,$scope, CompanyFactory, $routeParams, VacancyFactory, CatalogFactory,EventFactory,SettingFactory){
    $scope.init=function(){
        // всего вакансий, решений, новостей
        $scope.vacanciesText="";
        $scope.GetCompany($routeParams.CompanyID);
        $scope.GetVacancies($routeParams.CompanyID);
        $scope.GetSolutions($routeParams.CompanyID);
        $scope.GetEvents($routeParams.CompanyID);
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_company.html';
        $rootScope.MenuActive.Controller='ViewCompanyCtrl';
        $rootScope.MenuActive.CompaniesView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Company.Title;
        SettingFactory.GetSettings();

/*
        if ($scope.vacancies[0].CountAll != null){
        $scope.vacanciesText="Вакансий "+vacancies[0].CountAll;
        }
*/
    };
    $scope.GetCompany=function(id){
        CompanyFactory.GetCompany(id).success(function(data){
            $scope.company=data.children;

            var address = $scope.company[0].Street;
            var myGeocoder = ymaps.geocode(address,{ results: 1 });//
            myGeocoder.then(
                function (res) {

                    myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
                        hintContent: $scope.company[0].Name
                        //balloonContent: 'Столица России'
                    });

                    var map=new ymaps.Map ("map", {
                        center: res.geoObjects.get(0).geometry.getCoordinates(),
                        zoom: 10
                    });

                    map.geoObjects.add(myPlacemark);
                },function (err){

                });
        });
    };
    $scope.GetVacancies=function(ID){
        VacancyFactory.GetVacancies(ID).success(function(data){
            $scope.vacancies=data.children;
            $scope.vacanciesText=$rootScope.Page.Common.Vacancies + " ["+$scope.vacancies[0].CountAll+"]";
        });
    };
    $scope.GetSolutions=function(ID){
        CatalogFactory.GetCompanySolutions(ID).success(function(data){
            $scope.solutions=data.children;
            $scope.solutionsText=$rootScope.Page.Common.Solutions+ " ["+$scope.solutions[0].CountAll+"]";
        });
    };
    $scope.GetEvents=function(ID){
        EventFactory.GetEvents(0,ID).success(function(data){
            $scope.events=data.children;
            $scope.eventsText= $rootScope.Page.Common.Events + " ["+$scope.events[0].CountAll+"]";
        });
    };
    $scope.init();

}
//******************************************* Company End ************************************************************//


//******************************************* Catalog Start **********************************************************//
function ViewCatalogCtrl($rootScope,$scope,CatalogFactory,SettingFactory,LanguageFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_catalog.html';
        $rootScope.MenuActive.Controller='ViewCatalogCtrl';
        $rootScope.MenuActive.CatalogView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Catalog.Title;
        SettingFactory.GetSettings();

        $scope.GetCatalog();
    };
    $scope.GetCatalog=function(){
        CatalogFactory.GetCatalogs().success(function(data){
            $scope.catalogs=data.children;
        });
    };

    $scope.init();
}
function ViewSolutionCtrl($rootScope,$scope,CatalogFactory,$routeParams,SettingFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_solution.html';
        $rootScope.MenuActive.Controller='ViewSolutionCtrl';
        $rootScope.MenuActive.CatalogView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Solution.Title;
        SettingFactory.GetSettings();
        $scope.GetSolution($routeParams.SolutionID);
    };
    $scope.GetSolution=function(SolutionID){
        CatalogFactory.GetSolution(SolutionID).success(function(data){
            $scope.solution=data.children;
        });
    };

    $scope.init();
}
//******************************************* Catalog End ************************************************************//

//******************************************* Event Start **********************************************************//
function ViewEventsCtrl($rootScope,$scope,EventFactory,CompanyFactory,SettingFactory,LanguageFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_events.html';
        $rootScope.MenuActive.Controller='ViewEventsCtrl';
        $rootScope.MenuActive.EventsView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Event.Title;
        SettingFactory.GetSettings();

        $scope.GetEvents(0);
        $scope.GetCompaniesList();

    };
    $scope.GetEvents=function(count){
        EventFactory.GetEvents(count,0).success(function(data){
            $scope.events=data.children;
        });
    };
    $scope.GetCompaniesList=function(){
        CompanyFactory.GetCompaniesSelect().success(function(data){
            $scope.companiesList=data.children;
        });
    };
    $scope.init();
}
function ViewEventsBoxCtrl($rootScope,$scope,EventFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_events.html';
        $rootScope.MenuActive.Controller='ViewEventsBoxCtrl';
        $rootScope.MenuActive.EventsView='active';
        $scope.GetEvents(1);
    };
    $scope.GetEvents=function(count){
        EventFactory.GetEvents(count,0).success(function(data){
            $scope.events=data.children;
        });
    };
    $scope.init();
}

function ViewEventCtrl($rootScope,$scope,EventFactory,$routeParams,SettingFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_event.html';
        $rootScope.MenuActive.Controller='ViewEventCtrl';
        $rootScope.MenuActive.EventsView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.Event.Title;
        SettingFactory.GetSettings();
        $scope.GetEvent($routeParams.EventID);
    };
    $scope.GetEvent=function(count){
        EventFactory.GetEvent(count).success(function(data){
            $scope.event=data.children;});
    };
    $scope.init();

}
//******************************************* Event End ************************************************************//

//******************************************** About ***************************************************************//
function ViewAboutCtrl($rootScope,$scope,SettingFactory){
    $scope.init=function(){
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        SettingFactory.GetSettings();


    };

    $scope.init();

}
//******************************************** About ***************************************************************//




//******************************************** dance ***************************************************************//

function ViewAboutCtrl($rootScope,$scope,SettingFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        //$scope.lang=LanguageFactory.GetCurrentLanguage();
        //SettingFactory.GetSettings();
    }
    $scope.intit();
}

function ViewBalanceCtrl($rootScope,$scope,SettingFactory,LanguageFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();

    }
    $scope.intit();
}

function ViewTimeTableCtrl($rootScope,$scope,SettingFactory,LanguageFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        SettingFactory.GetSettings();
    }
    $scope.intit();
}

function ViewGroupsCtrl($rootScope,$scope,SettingFactory,LanguageFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        SettingFactory.GetSettings();
    }
    $scope.intit();
}


function ViewTrainerCtrl($rootScope,$scope,SettingFactory,LanguageFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        SettingFactory.GetSettings();
    }
    $scope.intit();
}

function ViewPrivateLessonsCtrl($rootScope,$scope,SettingFactory,LanguageFactory) {

    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        SettingFactory.GetSettings();
    }
    $scope.intit();
}

function ViewSchoolsCtrl($rootScope,$scope,SettingFactory,LanguageFactory) {

    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        SettingFactory.GetSettings();
    }
    $scope.intit();
}

function LeftInfoPanelCtrl($rootScope,$scope,SettingFactory,LanguageFactory) {



}

function ViewTrainersCtrl($rootScope,$scope,SettingFactory,LanguageFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        SettingFactory.GetSettings();
    }
    $scope.intit();
}

//******************************************** dance ***************************************************************//