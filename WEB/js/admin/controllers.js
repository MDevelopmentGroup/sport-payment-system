/**
 * Created by Victor77 on 10.12.13.
 */
//********************************************** User ****************************************************************//
function ViewUsersCtrl($scope,$rootScope,UserFactory,$modal){
    $scope.init=function(){
        $rootScope.MenuActive={
            Controller:'ViewUsersCtrl',
            Page:'partials/admin/view/view_users.html',
            UsersView:'active'
        };
        $scope.Get();
    };
    $scope.Get=function(){

        UserFactory.GetAll().success(function(data){
            $scope.users=data.children;
        });
    };
    $scope.Delete=function(ID,data){
        $scope.data={
            Name:data.FirstName+" "+data.LastName
        };

        $scope.data.ok=function(){
            UserFactory.Delete(ID).success(function(){
                $scope.Get();
            });
        }
        var modal = $modal({scope:$scope,show:true,backdrop:false,template:'partials/admin/modal/modal_delete.html'});

    };
    $scope.init();
}
function CreateUserCtrl($scope,$rootScope,UserFactory){
    $scope.init=function(){
        $rootScope.MenuActive={
            Controller:'CreateUserCtrl',
            Page:'partials/admin/view/CRUD_user.html',
            UsersView:'active'
        };
    };
    $scope.OK=function(data){
        UserFactory.Create(data);
    };
    $scope.init();
}
function UpdateUserCtrl($scope,$rootScope,UserFactory,$routeParams)
{
    $scope.init=function(){
        $rootScope.MenuActive={
            Controller:'UpdateUserCtrl',
            Page:'partials/admin/view/CRUD_user.html',
            UsersView:'active'
        };
        $scope.Get($routeParams.ID);
    };
    $scope.Get=function(ID){
        UserFactory.Get(ID).success(function(data){
            $scope.user=data.children[0];
        });
    };
    $scope.OK=function(data){
        UserFactory.Update(data);
    };
    $scope.init();
}
//********************************************** User ****************************************************************//


//********************************************** School ****************************************************************//
function ViewSchoolsCtrl($scope,$rootScope,SchoolFactory,$modal){
    $scope.init=function(){
        $rootScope.MenuActive={
            Controller:'ViewSchoolsCtrl',
            Page:'partials/admin/view/view_schools.html',
            SchoolsView:'active'
        };
        $scope.Get();
    };
    $scope.Get=function(){
        SchoolFactory.GetAll().success(function(data){
            $scope.schools=data.children;
        });
    };

    $scope.Delete=function(ID,data){
        $scope.data={
            Name:data.Name
        };

        $scope.data.ok=function(){
            SchoolFactory.Delete(ID).success(function(){
                $scope.Get();
            });
        };
        var modal = $modal({scope:$scope,show:true,backdrop:false,template:'partials/admin/modal/modal_delete.html'});

    };
    $scope.init();
}
function CreateSchoolCtrl($scope,$rootScope,SchoolFactory)
{
    $scope.init=function(){
        $rootScope.MenuActive={
            Controller:'CreateSchoolCtrl',
            Page:'partials/admin/view/CRUD_school.html',
            SchoolsView:'active'
        };

    };
    $scope.OK=function(data){
        SchoolFactory.Create(data);
    };
    $scope.init();
}
function UpdateSchoolCtrl($scope,$rootScope,SchoolFactory,$routeParams)
{
    $scope.init=function(){
        $rootScope.MenuActive={
            Controller:'UpdateSchoolCtrl',
            Page:'partials/admin/view/CRUD_school.html',
            SchoolsView:'active'
        };
        $scope.Get($routeParams.ID)
    };
    $scope.Get=function(ID){
        SchoolFactory.Get(ID).success(function(data){
            $scope.school=data.children[0];
        });
    };
    $scope.OK=function(data){
        SchoolFactory.Update(data).success(function(){

        });
    };
    $scope.init();
}
//********************************************** School ****************************************************************//