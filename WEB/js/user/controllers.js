


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

    };

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
        };
        $scope.GetAllRooms();

        $scope.lang=LanguageFactory.GetCurrentLanguage();
        $scope.GetLessontypes=function(){SchoolFactory.GetLessonTypes().success(function(data){
            $scope.ListLessonTypes=data.children;

        })};
        $scope.GetLessontypes();
    };

    $scope.GetPrice=function(){
        var id=AuthenticationFactory.GetCurrentUser().IdSchool;
        SchoolFactory.GetPrice(id).success(function(data){
            $scope.PriceList=data.children;
        });
    };

    $scope.AddPrice=function(price){
            $scope.Price={};
            $scope.SetType=function(TypeLessonTypeID){
                SchoolFactory.GetEndTimeLastPrice(TypeLessonTypeID).success(function(data){
                    var datetime=new Date(Date.parse(data.children));
                    $scope.Price.TimeBegin=$scope.CheckTime(datetime.getHours())+":"+$scope.CheckTime(datetime.getMinutes())+":00";
                    $scope.Price.DateBegin=$scope.CheckTime(datetime.getDate())+"/"+$scope.CheckTime(datetime.getMonth())+"/"+$scope.CheckTime(datetime.getFullYear());
                });
            };
            $scope.ChangeType=function(id){
                console.log(id)
            };
            $scope.submit=function(price){
                console.log(price);
                price.dateActual=price.sharedDate+" "+price.sharedTime;
                console.log(price);
                SchoolFactory.AddPrice(price).success(function(data){
                    $scope.GetLessontypes();
                    $scope.GetPrice();
                    modal.hide();
                })
            };
        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/modal/AddPrice.html', show: true});
    };

    $scope.InviteInstructor=function(){
        $scope.submit=function(Instructor){
            Instructor.Email="azzilla@mail.ru";
            console.log(Instructor);
            SchoolFactory.InviteInstructor(Instructor.Email).success(function(data){

                modal.hide();
            })
        };

        var modal=$modal({scope: $scope, placement:"center", backdrop:false, template: 'partials/user/modal/InviteInstructor.html', show: true});
    };
    $scope.GetInstructorList=function(){
        SchoolFactory.GetInstructorList($scope.IdSchool).success(function(data){
                $scope.InstructorList=data.children;
            }
        );
    };
    $scope.GetSchool=function(ID) {
        SchoolFactory.GetSchool(ID).success(function(data){
            $scope.school=data.children[0];
        });
    };
    $scope.RemoveFromSchool=function(ID){
        SchoolFactory.RemoveFromSchool(ID).success(function(){
            $scope.GetInstructorList();
        });

    };
    $scope.initit();
    $scope.GetPrice();
    $scope.GetInstructorList();
    if($rootScope.User) {$scope.GetSchool($rootScope.User.IdSchool)};
    $scope.CheckTime=function(time){
        if(time==0){
            time="00"
        }
        if(time.toString().length==1){
            time="0"+time.toString();
        }
        return time
    }
};
//******************************************** MySchoolCtrl ***************************************************************//









//******************************************** LessonInTimeTableCtrl ***************************************************************//
function LessonInTimeTableCtrl($scope,$rootScope,$modal,$routeParams,LanguageFactory,AuthenticationFactory,SchoolFactory){

    $scope.mode = "custom";
    $scope.maxHeight = 0;
    $scope.showWeekends = true;
    $scope.showNonWorkHours = true;
    $scope.toDate=(new Date(Date.parse("Sun Jan 11 2014 00:00:00"))).getDate();
    console.log($scope.toDate);
    $scope.Date={
        0:"5 Jan 2014 ",
        1:"6 Jan 2014 ",
        2:"7 Jan 2014 ",
        3:"8 Jan 2014 ",
        4:"9 Jan 2014 ",
        5:"10 Jan 2014 ",
        6:"11 Jan 2014 "
    };


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
        SchoolFactory.GetLessonsFromTable()
            .success(function(data){
            $scope.LessonList=data.children;
            $scope.loadInGantt($scope.LessonList);
                /*
            $scope.rows=[];
            var date="5 Jan 2014 "
            var est=new Date("Sun Jan 05 2014 18:00:00");
            var lct=new Date("Sun Jan 06 2014 01:00:00");
            for(var i=0;i<$scope.LessonList.length;i++){
                var row={};
                row.tasks=[];
                console.log("$scope.LessonList[i]=");console.log($scope.LessonList[i]);
                row.id=$scope.LessonList[i].RoomId;
                row.description=$scope.LessonList[i].RoomName;
                row.order=1;
                row.data="asdasdad";
                var task={};
                task.color="#93C47D";
                task.data="#93C47D";
                task.id=$scope.LessonList[i].ID; //$scope.LessonList[i].RoomDescr;
                task.subject=$scope.LessonList[i].ShortDescription
                task.from=new Date(Date.parse($scope.Date[$scope.LessonList[i].Day]+$scope.LessonList[i].TimeBegin));
                task.to=new Date(Date.parse($scope.Date[$scope.LessonList[i].Day]+$scope.LessonList[i].TimeEnd));
                if((task.from-task.to)>0){
                    task.to.setDate(task.to.getDate()+1);
                }
                task.est=est;
                task.lct=lct;
                row.tasks.push(task);
                $scope.rows[i]=row;

            }
            console.log($scope.rows);
                if($scope.loadData==undefined){

                    setTimeout($scope.loadData($scope.rows), 2000);
                }
                else{
                    $scope.loadData($scope.rows)
                }*/
        });
    }
    $scope.loadInGantt=function(LessonList)
    {
        console.log(LessonList);
        $scope.rows=[];
        $scope.rows[0]={
            "id": "ec0c5e31-449f-42d0-9e81-45c66322b640", "description": "Неделя", "order": 14, "tasks":
                [
                    {
                        "id": "edf2cece-2d17-436f-bead-691edbc7386b", "subject": "", "color": "#FFFFFF", "from": new Date(2014,0,05,00, 00,00), "to": new Date(2014,0,05,00, 00,01)
                    },
                    {
                        "id": "edf2cece-2d17-436f-bead-691edbc7386b", "subject": "", "color": "#FFFFFF", "from": new Date(2014,0,12,00, 00,00), "to": new Date(2014,0,12,00, 00,00)
                    }
                ]
        };
        var date="5 Jan 2014 "
        var est="18:00:00";
        var lct="23:00:00";
        for(var i=0;i<LessonList.length;i++){
            var row={};
            row.tasks=[];
            console.log("$scope.LessonList[i]=");console.log(LessonList[i]);
            row.id=LessonList[i].RoomId;
            row.description=LessonList[i].RoomName;
            row.order=1;
            row.data="asdasdad";
            var task={};
            task.color="#93C47D";
            task.id=LessonList[i].ID; //$scope.LessonList[i].RoomDescr;
            task.subject=LessonList[i].ShortDescription
            task.from=new Date(Date.parse($scope.Date[LessonList[i].Day]+LessonList[i].TimeBegin));
            task.to=new Date(Date.parse($scope.Date[LessonList[i].Day]+LessonList[i].TimeEnd));
            if((task.from-task.to)>0){
                task.to.setDate(task.to.getDate()+1);
            }
            task.est=new Date(Date.parse($scope.Date[LessonList[i].Day]+est));;
            task.lct=new Date(Date.parse($scope.Date[LessonList[i].Day]+lct));;
            task.data={}
            task.data.InstructorID=LessonList[i].InstructorID
            task.data.TypeLessonId=LessonList[i].TypeLessonId
            row.tasks.push(task);
            $scope.rows[i+1]=row;

        }
        console.log($scope.rows);
        if($scope.loadData==undefined){

            setTimeout($scope.loadData($scope.rows), 2000);
        }
        else{
            $scope.loadData($scope.rows)
        }
        console.log($scope.rows);
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
    $scope.EditLesson=function(event){
        $scope.Lesson={};
        $scope.Lesson.ID=event.task.id;
        $scope.Lesson.InstructorID=event.task.data.InstructorID;
        $scope.Lesson.TypeLessonId=event.task.data.TypeLessonId;
        $scope.Lesson.TimeBegin=$scope.CheckTime(event.task.from.getHours())+":"+$scope.CheckTime(event.task.from.getMinutes())+":00";

        //console.log($scope.CheckTime(event.task.to.getHours()).toString());
        $scope.Lesson.TimeEnd=$scope.CheckTime(event.task.to.getHours())+":"+$scope.CheckTime(event.task.to.getMinutes())+":00";
        $scope.Lesson.ShortDescription=event.task.subject;
        $scope.Lesson.Day=event.task.from.getDay();
        $scope.Lesson.RoomId=event.task.row.id;

        console.log($scope.Lesson);
            $scope.submit=function(Lesson){
                SchoolFactory.UpdateLessonInTable(Lesson).success(function(){
                    modal.hide();
                    $scope.Lesson=null;
                    SchoolFactory.GetLessonsFromTable()
                        .success(function(data){
                            $scope.LessonList=data.children;

                            $scope.loadInGantt($scope.LessonList);
                        })

                })
            };
            var modal=$modal({scope:$scope,placement:"center",backdrop:false, template:'partials/user/modal/EditLesson.html',show:true})
    };
    $scope.CheckTime=function(time){
        if(time==0){
            time="00"
        }
        if(time.toString().length==1){
            time="0"+time.toString();
        }
        return time
    }
    $scope.AddLessonInTable=function(event){
        $scope.Lesson={};
        $scope.Lesson.TimeBegin=$scope.CheckTime(event.date.getHours())+":"+$scope.CheckTime(event.date.getMinutes())+":00";
        console.log($scope.Lesson.TimeBegin);
        $scope.Lesson.DayID=event.date.getDay();
        $scope.Lesson.RoomId=event.row.id;
        console.log($scope.Lesson);
        $scope.submit=function(Lesson){
                SchoolFactory.AddLessonInTable(Lesson).success(function(){
                    SchoolFactory.GetLessonsFromTable()
                        .success(function(data){
                            $scope.LessonList=data.children;
                            $scope.loadInGantt($scope.LessonList);});
                modal.hide();
                $scope.Lesson=null;
            });
        };
        var modal=$modal({scope:$scope,placement:"center",backdrop:false, template:'partials/user/modal/AddLesson.html',show:true})
    }

    $scope.UpdateLessonTable=function(){
        SchoolFactory.UpdateLessonTable($scope.LessonList).success(function(data){

        })
    }
    $scope.taskEvent=function(event){
        $scope.EditLessionSubject=event.task.subject;
        if(event.evt)
        {
            if($scope.divEl) {
                $scope.divEl.removeClass("action");
            }
            $scope.divEl=angular.element(event.evt.currentTarget);
            $scope.divEl.addClass("action");
        }
    };
    $scope.taskDbClEvent=function(event){
        console.log('Task event taskDbClEvent (by user: ' + event.userTriggered + '): ' + event.task.subject + ' (Custom id: ' + event.task.id + ')');
    };
    $scope.taskContClEvent=function(event){
        console.log('Task event taskContClEvent (by user: ' + event.userTriggered + '): ' + event.task.subject + ' (Custom id: ' + event.task.id + ')');
    };

    $scope.taskUpdateEvent = function(event) {
        // A task has been updated or clicked.
        console.log('Task upddateEvent (by user: ' + event.userTriggered + '): ' + event.task.subject + ' (Custom id: ' + event.task.id + ')');
        /*var elememnt=document.getElementById("taskid_"+event.task.id);
        $scope.EditLessionSubject=event.task.subject;
        $scope.LessonBegin=event.task.from.getHours()+":"+event.task.from.getMinutes();*/
        for (var i=0;i<$scope.LessonList.length;i++){
            if($scope.LessonList[i].ID==event.task.id)
            {
                console.log(event);
                //console.log(event.task.from.getHours()+":"+event.task.from.getMinutes()+":"+event.task.from.getSeconds());
                $scope.LessonList[i].TimeBegin=event.task.from.getHours()+":"+event.task.from.getMinutes();
                $scope.LessonList[i].TimeEnd=event.task.to.getHours()+":"+event.task.to.getMinutes();
                $scope.LessonList[i].Day=event.task.from.getDay();
                $scope.LessonList[i].RoomId = event.task.row.id;
                console.log($scope.LessonList[i]);
            }
        }
        var elem=document.getElementById(event.task.id);
        //{}.toString.call(obj)
    };
    $scope.UpdateRow=function(event){
        console.log("Row Update");
    };
    $scope.onTaskMoveEnd=function(event){
        console.log("onTaskMoveEnd");
    };




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