


//***************************************** Authentication ***********************************************//
//***************************************** Authentication ***********************************************//



//******************************************** dance ***************************************************************//

//******************************************** ViewLKCtrl ***************************************************************//
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
//******************************************** ViewLKCtrl ***************************************************************//


//******************************************** NavBarCtrl ***************************************************************//
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
        $scope.Name=$scope.User.UserName;
        $scope.HASH=$scope.User.HASH;
        $scope.IdSchool=$scope.User.IdSchool;
        if($scope.IdSchool){ $rootScope.User=$scope.User;}
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
                $scope.success=data.User;
                if($scope.success){
                    Modal.hide();
                    //$scope.init();
                    //location.reload();
                    $scope.User.ID=data.userId;
                    location.reload();
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
            location.reload();
        });
    };
    $scope.init();
}
//******************************************** NavBarCtrl ***************************************************************//


//******************************************** MySchoolCtrl ***************************************************************//
function MySchoolCtrl($scope,$rootScope,$modal,LanguageFactory,AuthenticationFactory,SchoolFactory){
    $scope.initit=function() {
        $rootScope.MenuActive = {};
        $rootScope.MenuActive.Page = 'partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller = 'ViewAboutCtrl';
        $rootScope.MenuActive.AboutView = 'active';
        $rootScope.Page.Menu.BrandTitle = $rootScope.Page.About.Title;
        $scope.school={};$scope.school.Rooms={};
        $scope.User = AuthenticationFactory.GetCurrentUser();
        $scope.Name = $scope.User.UserName;
        $scope.HASH = $scope.User.HASH;
        $scope.IdSchool = $scope.User.IdSchool;
        if ($scope.IdSchool) {
            $rootScope.User = $scope.User;
        }
        $scope.GetAllRooms=function(){
            SchoolFactory.GetAllRoomsForSchool().success(function(data){
                $scope.rooms=data.children;
            });
        }
        $scope.GetAllRooms();

        $scope.lang=LanguageFactory.GetCurrentLanguage();
        $scope.GetLessontypes=function(){SchoolFactory.GetLessonTypes().success(function(data){
            $scope.ListLessonTypes=data.children;

        })};
        $scope.GetLessontypes();
    }
    $scope.GetPrice=function(){
        var id=AuthenticationFactory.GetCurrentUser().IdSchool;
        SchoolFactory.GetPrice(id).success(function(data){
            $scope.PriceList=data.children;
        });
    }
    $scope.AddPrice=function(price){
            $scope.submit=function(price){
                console.log(price);
                price.dateActual=price.sharedDate+" "+price.sharedTime;
                SchoolFactory.AddPrice(price).success(function(data){
                    $scope.GetLessontypes();
                    modal.hide();
                })};
        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/modal/AddPrice.html', show: true});
    }

    $scope.InviteInstructor=function(){
        $scope.submit=function(Instructor){
            Instructor.Email="azzilla@mail.ru";
            console.log(Instructor);
            SchoolFactory.InviteInstructor(Instructor.Email).success(function(data){

                modal.hide();
            })
        };

        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/modal/InviteInstructor.html', show: true});
    }
    $scope.GetInstructorList=function(){
        SchoolFactory.GetInstructorList($scope.IdSchool).success(function(data){
                $scope.InstructorList=data.children;
            }
        );
    }
    $scope.GetSchool=function(ID) {
        SchoolFactory.GetSchool(ID).success(function(data){
            $scope.school=data.children[0];
        });
    }
    $scope.RemoveFromSchool=function(ID){
        SchoolFactory.RemoveFromSchool(ID).success(function(){
            $scope.GetInstructorList();
        });

    }
    $scope.initit();
    $scope.GetPrice();
    $scope.GetInstructorList();
    if($rootScope.User) {$scope.GetSchool($rootScope.User.IdSchool)};
};
//******************************************** MySchoolCtrl ***************************************************************//









//******************************************** LessonInTimeTableCtrl ***************************************************************//
function LessonInTimeTableCtrl($scope,$rootScope,$modal,$routeParams,LanguageFactory,AuthenticationFactory,SchoolFactory){

    $scope.mode = "custom";
    $scope.maxHeight = 0;
    $scope.showWeekends = true;
    $scope.showNonWorkHours = true;
    $rootScope.MenuActive = {};
    $rootScope.MenuActive.Page = 'partials/user/view/view_about.html';
    $rootScope.MenuActive.Controller = 'ViewAboutCtrl';
    $rootScope.MenuActive.AboutView = 'active';
    $rootScope.Page.Menu.BrandTitle = $rootScope.Page.About.Title;
    $rootScope.User= AuthenticationFactory.GetCurrentUser();
    $scope.school={};$scope.school.Rooms={};
    $scope.User = AuthenticationFactory.GetCurrentUser();
    $scope.Name = $scope.User.UserName;
    $scope.HASH = $scope.User.HASH;
    $scope.IdSchool = $scope.User.IdSchool;
    if ($scope.IdSchool) {
        $rootScope.User = $scope.User;
    }
    $scope.GetLessonsFromTable=function(){
        SchoolFactory.GetLessonsFromTable().success(function(data){
            var LessonList=data.children;
            console.log($scope.LessonList);
            var rows=[];
            var date="5 Jan 2014 "
            var est=new Date("Sun Jan 05 2014 18:00:00");
            var lct=new Date("Sun Jan 06 2014 01:00:00");
            for(var i=0;i<LessonList.length;i++){
                var row={};
                row.tasks=[];
                switch (LessonList[i].Day){
                    case 0 :
                        var date="5 Jan 2014 ";
                        break;
                    case 1 :
                        var date="6 Jan 2014 ";
                        break;
                    case 2 :
                        var date="7 Jan 2014 ";
                        break;
                    case 3 :
                        var date="8 Jan 2014 ";
                        break;
                    case 4 :
                        var date="9 Jan 2014 ";
                        break;
                    case 5 :
                        var date="10 Jan 2014 ";
                        break;
                    case 6 :
                        var date="11 Jan 2014 ";
                        break;
                }

                console.log("$scope.LessonList[i]=");console.log(LessonList[i]);
                row.id=LessonList[i].RoomId;
                row.description=LessonList[i].RoomName;
                row.order=1;
                row.data="asdasdad";
                var task={};
                task.color="#93C47D";
                task.data="#93C47D";
                task.id=LessonList[i].ID; //$scope.LessonList[i].RoomDescr;
                task.subject=LessonList[i].ShortDescription
                task.from=new Date(Date.parse(date+LessonList[i].TimeBegin));
                task.to=new Date(Date.parse(date+LessonList[i].TimeEnd));
                if((task.from-task.to)>0){
                    task.to.setDate(task.to.getDate()+1);
                }
                task.est=est;
                task.lct=lct;
                row.tasks.push(task);
                rows[i]=row;
            }
            $scope.data=row;
            console.log(rows);
            $scope.loadData(rows);
        });
    }
    $scope.GetLessonsFromTable();
    $scope.Days={"Sunday":{"ID":0,"Name":"Sunday"},
        "Monday":{"ID":1,"Name":"Monday"},
        "Tuesday":{"ID":2,"Name":"Tuesday"},
        "Wednesday":{"ID":3,"Name":"Wednesday"},
        "Thursday":{"ID":4,"Name":"Thursday"},
        "Friday":{"ID":5,"Name":"Friday"},
        "Saturday": {"ID": 6,"Name": "Saturday"}
    };
    $scope.mode = "custom";
    $scope.maxHeight = 0;
    $scope.showWeekends = true;
    $scope.showNonWorkHours = true;
    $scope.GetLessontypes=function(){SchoolFactory.GetLessonTypes().success(function(data){
        $scope.ListLessonTypes=data.children;

    })};
    $scope.GetLessontypes();
    $scope.GetAllRooms=function(){
        SchoolFactory.GetAllRoomsForSchool().success(function(data){
            $scope.rooms=data.children;
        });
    }
    $scope.GetAllRooms();

    $scope.addSamples = function () {
        console.log($scope.getSampleData().data1);
        $scope.loadData($scope.getSampleData().data1);
    };
    $scope.GetInstructorList=function(){
        SchoolFactory.GetInstructorList($scope.IdSchool).success(function(data){
                $scope.InstructorList=data.children;
            }
        );
    }
    $scope.GetInstructorList();
    $scope.removeSomeSamples = function () {
        $scope.removeData([

        ]);
    };

    $scope.removeSamples = function () {
        $scope.clearData();
    };

    $scope.labelEvent = function(event) {
        // A label has been clicked.
        console.log('Label event (by user: ' + event.userTriggered + '): ' + event.row.description + ' (Custom data: ' + event.row.data + ')');
    };

    $scope.labelHeaderEvent = function(event) {
        // The label header has been clicked.
        console.log('Label header event. Mouse: ' + event.evt.clientX + '/' + event.evt.clientY);
    };

    $scope.rowEvent = function(event) {
        // A row has been added, updated or clicked. Use this event to save back the updated row e.g. after a user re-ordered it.
        console.log('Row event (by user: ' + event.userTriggered + '): ' + event.date + ' '  + event.row.description + ' (Custom data: ' + event.row.data + ')');
    };

    $scope.scrollEvent = function(event) {
        if (angular.equals(event.direction, "left")) {
            // Raised if the user scrolled to the left side of the Gantt. Use this event to load more data.
            console.log('Scroll event: Left');
        } else if (angular.equals(event.direction, "right")) {
            // Raised if the user scrolled to the right side of the Gantt. Use this event to load more data.
            console.log('Scroll event: Right');
        }
    };
    $scope.EditLesson=function(){
        SchoolFactory.GetLesson($scope.EditLessonId).success(function(data){
            $scope.Lesson=data.children;
            $scope.submit=function(Lesson){
                SchoolFactory.UpdateLessonInTable(Lesson).success(function(){

                    //modal.hide()
                    $scope.Lesson=null;
                })
            }
            var modal=$modal({scope:$scope,placement:"center",backdrop:false, template:'partials/user/modal/EditLesson.html',show:true})
            });
    }
    $scope.taskEvent = function(event) {
        // A task has been updated or clicked.
        console.log('Task event (by user: ' + event.userTriggered + '): ' + event.task.subject + ' (Custom id: ' + event.task.id + ')');
        $scope.EditLessonId=event.task.id;
        $scope.EditLessionSubject=event.task.subject;
        $scope.LessonBegin=event.task.from.getHours()+":"+event.task.from.getMinutes();

    };

    $scope.AddLesson=function(){
            $scope.loadData(
                {
                    "id": "b8d10927-cf50-48bd-a056-3554decab824", "description": "Status meetings", "order": 1, "tasks":
                    [
                        {"id": "301d781f-1ef0-4c35-8398-478b641c0658", "subject": "Demo", "color": "#9FC5F8", "from": new Date(2013,9,25,15,0,0), "to": new Date(2013,9,25,18,30,0)},
                        {"id": "0fbf344a-cb43-4b20-8003-a789ba803ad8", "subject": "Demo", "color": "#9FC5F8", "from": new Date(2013,10,1,15,0,0), "to": new Date(2013,10,1,18,0,0)},
                        {"id": "12af138c-ba21-4159-99b9-06d61b1299a2", "subject": "Demo", "color": "#9FC5F8", "from": new Date(2013,10,8,15,0,0), "to": new Date(2013,10,8,18,0,0)},
                        {"id": "73294eca-de4c-4f35-aa9b-ae25480967ba", "subject": "Demo", "color": "#9FC5F8", "from": new Date(2013,10,15,15,0,0), "to": new Date(2013,10,15,18,0,0)},
                        {"id": "75c3dc51-09c4-44fb-ac40-2f4548d0728e", "subject": "Demo", "color": "#9FC5F8", "from": new Date(2013,10,24,9,0,0), "to": new Date(2013,10,24,10,0,0)}
                    ]
                },
                {
                    "id": "34473cc4-5ee5-4953-8289-98779172129e", "description": "Setup server", "order": 9, "tasks":
                    [
                    {"id": "43eb6d19-6402-493c-a281-20e59a6fab6e", "subject": "HW", "color": "#F1C232", "from": new Date(2013,10,18,8,0,0), "to": new Date(2013,10,18,12,0,0)}
                    ]
                },
                {
                    "id": "73cae585-5b2c-46b6-aeaf-8cf728c894f7", "description": "Config server", "order": 10, "tasks":
                    [
                        {
                            "id": "8dbfda29-e775-4fa3-87c1-103b085d52ee", "subject": "SW / DNS/ Backups", "color": "#F1C232", "from": new Date(2013,10,18,12,0,0), "to": new Date(2013,10,21,18,0,0)
                        }
                    ]
                },
                {"id": "41cae585-ad2c-46b6-aeaf-8cf728c894f7", "description": "Deployment", "order": 11, "tasks": [
                    {"id": "2dbfda09-e775-4fa3-87c1-103b085d52ee", "subject": "Depl. & Final testing", "color": "#F1C232", "from": new Date(2013,10,21,8,0,0), "to": new Date(2013,10,22,12,0,0)}
                ]},
                {"id": "33e1af55-52c6-4ccd-b261-1f4484ed5773", "description": "Workshop", "order": 12, "tasks": [
                    {"id": "656b9240-00da-42ff-bfbd-dfe7ba393528", "subject": "On-side education", "color": "#F1C232", "from": new Date(2013,10,24,9,0,0), "to": new Date(2013,10,25,15,0,0)}
                ]}
            );
        $scope.submit=function(lesson){
            console.log(lesson)
            SchoolFactory.AddLessonInTable(lesson).success(function(data){
                    modal.hide();
                }
            )
        }

        var modal=$modal({scope:$scope,placement:"center",backdrop:false, template:'partials/user/modal/AddLesson.html',show:true})
    }



};
//******************************************** LessonInTimeTableCtrl ***************************************************************//











//******************************************** InviteCtrl ***************************************************************//
function InviteCtrl($scope,$rootScope,$modal,$routeParams,LanguageFactory,AuthenticationFactory,SchoolFactory){
    $rootScope.MenuActive = {};
    $rootScope.MenuActive.Page = 'partials/user/view/view_about.html';
    $rootScope.MenuActive.Controller = 'ViewAboutCtrl';
    $rootScope.MenuActive.AboutView = 'active';
    $rootScope.Page.Menu.BrandTitle = $rootScope.Page.About.Title;
    $rootScope.User= AuthenticationFactory.GetCurrentUser();
    //console.log($rootScope.User);
    $scope.submit=function(bl){
        if(bl){
            SchoolFactory.InviteAccept($routeParams.hash).success(function(){
                location="#/main/";
            });
        }
        else{
            SchoolFactory.InviteReject($routeParams.hash).success(function(){
                location="#/main/";
            });
        }
    }
};
//******************************************** InviteCtrl ***************************************************************//



//******************************************** registryNewInstructorCtrl ***************************************************************//

function registryNewInstructorCtrl($scope,$rootScope,$modal,$routeParams,LanguageFactory,AuthenticationFactory,SchoolFactory)
{
    $rootScope.MenuActive = {};
    $rootScope.MenuActive.Page = 'partials/user/view/view_about.html';
    $rootScope.MenuActive.Controller = 'ViewAboutCtrl';
    $rootScope.MenuActive.AboutView = 'active';
    $rootScope.Page.Menu.BrandTitle = $rootScope.Page.About.Title;
    $scope.registryNewInstructorCtrl=function(user)
    {
        if(user.accept){
            user.hash=$routeParams.hash;
            SchoolFactory.CreateNewInstructor(user).success(function(data){
            });
        }
        else{
            SchoolFactory.InviteReject($routeParams.hash).success(function() {
                location = "#/main/";
            });
        }
    }

}
//******************************************** registryNewInstructorCtrl ***************************************************************//


//******************************************** UpdateSchoolCtrl ***************************************************************//
function UpdateSchoolCtrl($scope,$rootScope,$modal,LanguageFactory,AuthenticationFactory,SchoolFactory){
    console.log("UpdateSchoolCtrl");


    $scope.initit=function() {
        $rootScope.MenuActive = {};
        $rootScope.MenuActive.Page = 'partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller = 'ViewAboutCtrl';
        $rootScope.MenuActive.AboutView = 'active';
        $rootScope.Page.Menu.BrandTitle = $rootScope.Page.About.Title;
        $scope.school={};$scope.school.Rooms={};
        $scope.User = AuthenticationFactory.GetCurrentUser();
        $scope.Name = $scope.User.UserName;
        $scope.HASH = $scope.User.HASH;
        $scope.IdSchool = $scope.User.IdSchool;
        if ($scope.IdSchool) {
            $rootScope.User = $scope.User;
        }
        $scope.GetAllRooms=function(){
            SchoolFactory.GetAllRoomsForSchool().success(function(data){
                $scope.rooms=data.children;
                console.log($scope.rooms);
            });
        }
        $scope.GetAllRooms();
        $scope.lang=LanguageFactory.GetCurrentLanguage();
    }
    $scope.initit();

    $scope.Update=function(school){
        SchoolFactory.Update(school).success(function(data){

        });
    }
    $scope.UpdateRoom=function(room){
        $scope.Room=room;

        SchoolFactory.GetAddress(room.Address).success(function(data){
            var Address=data.children[0];
            $scope.Room.IdAddress=Address.ID;
            $scope.Room.City=Address.City;
            $scope.Room.Country=Address.Country;
            $scope.Room.Street=Address.Street;
            $scope.Room.ShortDescr=room.ShorDescr;
        });

        $scope.Submit=function(room){
                    SchoolFactory.UpdateRoom(room).success(function(data) {
                    $scope.GetAllRooms();
                    $scope.Room={};
                    modal.hide();
            });
        };

        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/Update/UpdateRoom.html', show: true});
    }
    $scope.CreateRoom=function(){
        $scope.AddRoom=function(Room){
            SchoolFactory.AddRoomToSchool(Room).success(function(data){
                $scope.GetAllRooms();
            });
            modal.hide();
        }
        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/modal/AddRoom.html', show: true});
    }
    $scope.GetSchool=function(ID) {
        SchoolFactory.GetSchool(ID).success(function(data){
            $scope.school=data.children[0];
            console.log($scope.school);
        });
    }
    $scope.DeleteRoom=function(IdRoom){
        SchoolFactory.DeleteRoom(IdRoom).success(function(){

        });
    }
    if($rootScope.User) {$scope.GetSchool($rootScope.User.IdSchool)};
}
//******************************************** UpdateSchoolCtrl ***************************************************************//


//******************************************** ViewAboutCtrl ***************************************************************//
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

//******************************************** ViewAboutCtrl ***************************************************************//

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
        //SettingFactory.GetSettings();
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
        //SettingFactory.GetSettings();
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
        //SettingFactory.GetSettings();
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
        //SettingFactory.GetSettings();
    }
    $scope.intit();
}

function ViewSchoolsCtrl($rootScope,$scope,SettingFactory,LanguageFactory,AuthenticationFactory,SchoolFactory) {

    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        //$rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.User=AuthenticationFactory.GetCurrentUser();
        console.log($scope.User);
        $scope.Name=AuthenticationFactory.GetCurrentUser().UserName;
        $scope.HASH=AuthenticationFactory.GetCurrentUser().HASH;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        $scope.GetSchools();
        //SettingFactory.GetSettings();
    }
    $scope.GetSchools=function() {
        SchoolFactory.GetSchools().success(function(data){
            $scope.schools=data.children;
        });
    }
    $scope.intit();
}
function ViewSchoolCtrl($rootScope,$routeParams,$scope,SettingFactory,LanguageFactory,AuthenticationFactory,SchoolFactory)
{
    $rootScope.MenuActive={};
    $rootScope.MenuActive.Page='partials/user/view/view_about.html';
    $rootScope.MenuActive.Controller='ViewAboutCtrl';
    $rootScope.MenuActive.AboutView='active';
    //$rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
    $scope.User=AuthenticationFactory.GetCurrentUser();
    console.log($scope.User);
    $scope.Name=AuthenticationFactory.GetCurrentUser().UserName;
    $scope.HASH=AuthenticationFactory.GetCurrentUser().HASH;
    $scope.lang=LanguageFactory.GetCurrentLanguage();
    $scope.GetSchool=function(ID) {
        SchoolFactory.GetSchool(ID).success(function(data){
            $scope.school=data.children[0];
        });
    }
    if($routeParams.SchoolId) {$scope.GetSchool($routeParams.SchoolId)};
}


function CreateSchoolCtrl($rootScope,$scope,SettingFactory,LanguageFactory,FileFactory,SchoolFactory,$modal) {

    $scope.intit = function () {
        $rootScope.MenuActive = {};
        $scope.school={};
        $scope.school.Rooms={};
        $rootScope.MenuActive.Page = 'partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller = 'ViewAboutCtrl';
        $rootScope.MenuActive.AboutView = 'active';
        $scope.rooms={};  //при создании помещений нет
        //$rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang = LanguageFactory.GetCurrentLanguage();
        //SettingFactory.GetSettings();
    }
    $scope.CreateSchool = function (school) {
        SchoolFactory.CreateSchool($scope.school).success(function(){
        });
    }
    $scope.FileUpload = function () {
        var call=function(text)
        {
            $scope.school.ImageId=text;
            console.log($scope.school);
            console.log(text);
        }
        FileFactory.FileUpload("InputName", call);
    }
    $scope.intit();
    

}
function LeftInfoPanelCtrl($rootScope,$scope,$modal,SettingFactory,LanguageFactory,AuthenticationFactory) {
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        $scope.User=AuthenticationFactory.GetCurrentUser();
        $scope.IdSchool=$scope.User.IdSchool;
        $scope.lang=LanguageFactory.GetCurrentLanguage();

    }
    $scope.reg_Dancer=function(){
        $scope.FileLoad=function(){

        }
        $scope.CreateSystemUser=function(user)
        {
            console.log(user);
            AuthenticationFactory.AddNewDancer(user).success(function(){
                modal.hide();
            });
        }
        $scope.y=1;
        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/modal/register.html', show: true});

    }
    $scope.intit();


}

function ViewTrainersCtrl($rootScope,$scope,SettingFactory,LanguageFactory)
{
    $scope.intit=function()
    {
        $rootScope.MenuActive={};
        $rootScope.MenuActive.Page='partials/user/view/view_about.html';
        $rootScope.MenuActive.Controller='ViewAboutCtrl';
        $rootScope.MenuActive.AboutView='active';
        //$rootScope.Page.Menu.BrandTitle=$rootScope.Page.About.Title;
        $scope.lang=LanguageFactory.GetCurrentLanguage();
        //SettingFactory.GetSettings();
    }
    $scope.intit();
}

//******************************************** dance ***************************************************************//