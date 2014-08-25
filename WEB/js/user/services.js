/**
 * Created by Victor77 on 10.12.13.
 */
var app=angular.module('VACANCY.services', []);
var BaseUrl='/rest';

//************************************** Payment Start ***************************************************************//
app.factory('PaymentFactory',['$http','ErrorLogFactory',function($http,ErrorLogFactory){
    var PaymentFactory={};
    PaymentFactory.Init=function(data){
        return $http.post(BaseUrl+'/InitPayment/',data);
    }

    return PaymentFactory;
}]);
//************************************** Payment End *****************************************************************//

//************************************** Response Start ***************************************************************//
app.factory('ResponseFactory',['$http','ErrorLogFactory',function($http,ErrorLogFactory){
    var ResponseFactory={};
    ResponseFactory.CreateResponse=function(data){
        return $http.post(BaseUrl+'/CreateResponse/',data)
            .success(function(data, status, headers, config){ console.log("Got it!") })
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };

    return ResponseFactory;
}]);
//************************************** Response End ***************************************************************//

//************************************** User Start ******************************************************************//
app.factory('UserFactory',['$http','ErrorLogFactory',function($http,ErrorLogFactory){
    var UserFactory={};
    UserFactory.GetUser=function(UserID){
        return $http.get(BaseUrl+'/GetUser/')
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    UserFactory.GetUsers=function(){
        return $http.get()
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    return UserFactory;
}]);
//************************************** User End ********************************************************************//

//************************************** ErrorLog Start **************************************************************//
app.factory('ErrorLogFactory',['$http','$rootScope',function($http,$rootScope){
    var ErrorLogFactory={};
    ErrorLogFactory.CreateErrorLog=function(data){
        data.Page=$rootScope.MenuActive.Page;
        data.Controller=$rootScope.MenuActive.Controller;
        return $http.post(BaseUrl+'/ErrorLog/',data);
    };
    return ErrorLogFactory;
}]);
//************************************** ErrorLog End ****************************************************************//

//************************************** ErrorLog Start **************************************************************//
app.factory('LanguageFactory',['$http','$rootScope',function($http,$rootScope){
    var LanguageFactory={};
    LanguageFactory.SetInterfaceLanguage=function(Language){
        return $http.get('lang/user/'+Language+'.json').success(function(data){
            $rootScope.Page=data;
        }).error();
    };
    LanguageFactory.Init=function(){
            LanguageFactory.SetInterfaceLanguage(LanguageFactory.GetCurrentLanguage());
    };
    LanguageFactory.GetCurrentLanguage=function(){
        if(LanguageFactory.GetDefaultLanguage()!=null){
            return LanguageFactory.GetDefaultLanguage();
        }
        else{
            return LanguageFactory.GetBrowserLanguage();
        }
    };

    //todo: в зависимости от браузера разные языки
    LanguageFactory.GetBrowserLanguage=function(){
        var lang =navigator.browserLanguage || navigator.language || navigator.userLanguage;
        return lang.slice(0,2);
    };
    LanguageFactory.SetDefaultLanguage=function(lang){
        LanguageFactory.SetCookie('DefaultLanguage',lang,'/',3000)
    };
    LanguageFactory.GetDefaultLanguage=function(){
        return LanguageFactory.GetCookie('DefaultLanguage');
    };
    LanguageFactory.GetLanguage=function(){
        if(LanguageFactory.GetCurrentLanguage()==="ru"){ return 0;}
        if(LanguageFactory.GetCurrentLanguage()==="en"){ return 1;}
    };


    LanguageFactory.SetCookie=function(name,value,path,expires){
        var domain='';
        var secure='';
        expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
        var r = [name + "=" + escape(value)], s, i;
        for(i in s = {expires: expires, path: path, domain: domain}){
            s[i] && r.push(i + "=" + s[i]);
        }
        return secure && r.push("secure"), document.cookie = r.join(";"), true;
    };
    LanguageFactory.GetCookie=function(name){
        var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : null;
    };





    return LanguageFactory;
}]);

//************************************** ErrorLog End ****************************************************************//
//***************************************** AuthenticationFactory ****************************************************//
app.service('AuthenticationFactory',['$http','ErrorLogFactory','$rootScope',function($http,ErrorLogFactory,$rootScope){
    var AuthenticationFactory={};
    AuthenticationFactory.CurrentUser={ID:null,
        UserName:null,
        Email:null,
        UserImage:null,
        success:null,
        Login:null};
    AuthenticationFactory.GetCookie=function(name){
        var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : null;
    };
    AuthenticationFactory.SetCookie=function(name,value,path,expires){
        var domain='';
        var secure='';
        expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
        var r = [name + "=" + escape(value)], s, i;
        for(i in s = {expires: expires, path: path, domain: domain}){
            s[i] && r.push(i + "=" + s[i]);
        }
        return secure && r.push("secure"), document.cookie = r.join(";"), true;

    };
    AuthenticationFactory.GetCurrentUser=function(){
        AuthenticationFactory.CurrentUser.userId=AuthenticationFactory.GetCookie('userId');
        AuthenticationFactory.CurrentUser.success=AuthenticationFactory.GetCookie('success');
        AuthenticationFactory.CurrentUser.Email=AuthenticationFactory.GetCookie('Email');
        AuthenticationFactory.CurrentUser.Hash=AuthenticationFactory.GetCookie('uh');
        AuthenticationFactory.CurrentUser.Role=AuthenticationFactory.GetCookie('Role');
        AuthenticationFactory.CurrentUser.IdSchool=AuthenticationFactory.GetCookie('IdSchool');
        return AuthenticationFactory.CurrentUser;
    };
    AuthenticationFactory.CleanCurrentUser=function(){
        AuthenticationFactory.SetCookie('ID',      null,'/',-1);
        AuthenticationFactory.SetCookie('UserName',null,'/',-1);
        AuthenticationFactory.SetCookie('UserImage',null,'/',-1);
        AuthenticationFactory.SetCookie('Email',   null,'/',-1);
        AuthenticationFactory.SetCookie('Login',   null,'/',-1);
        AuthenticationFactory.SetCookie('success',   null,'/',-1);

    };
    AuthenticationFactory.GetAccessLevels=function(value){
        switch (value){
            case '0':
                return true;
                break;
            case '1':
                if(AuthenticationFactory.GetCurrentUser().UserName!=null){
                    return true;
                }
                else{
                    return false;
                }
                break;
        }
    };
    AuthenticationFactory.Login=function(data){
        return $http.post(BaseUrl+'/Login/',data)
            .success(function(data, status, headers, config){
                //AuthenticationFactory.SetCookie('HASH', data.hash,'/',-1);
                //AuthenticationFactory.SetCookie('ID', data.UserID,'/',-1);
                $rootScope.user=data.children;
                console.log($rootScope.user);
            })
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };

    AuthenticationFactory.Logout=function(){
        var user=AuthenticationFactory.GetCurrentUser();
        AuthenticationFactory.SetCookie('userId',      null,'/',-1);
        AuthenticationFactory.SetCookie('success',null,'/',-1);
        AuthenticationFactory.SetCookie('Email',null,'/',-1);
        AuthenticationFactory.SetCookie('uh',   null,'/',-1);
        AuthenticationFactory.SetCookie('Role',   null,'/',-1);
        AuthenticationFactory.SetCookie('IdSchool',   null,'/',-1);
        return $http.post(BaseUrl+'/Logout/',user)
            .success(function(data, status, headers, config){
                AuthenticationFactory.CleanCurrentUser();})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    AuthenticationFactory.AddNewDancer=function(data)
    {
        return $http.post(BaseUrl+"/Reg/",data)
            .success(function(data,status,headers,config){
            }
        );
    }
    return AuthenticationFactory;
}]);
//***************************************** AuthenticationFactory ****************************************************//

//***************************************** FileFactory ****************************************************//
app.factory('FileFactory',['$http','$rootScope','ErrorLogFactory',function($http,$rootScope,ErrorLogFactory) {
    var FileFactory={};
    FileFactory.FileUpload=function(InputName, call){
        var formData = new FormData();
        for(var i=0;i<document.getElementById(InputName).files.length;i++){
            formData.append("file"+i, document.getElementById(InputName).files[i]);
        }
        var reader = new FileReader;
        reader.readAsDataURL(document.getElementById(InputName).files[0]);
        var place = document.getElementById("Img");

        // Как только картинка загрузится
        reader.onload = function(e) {
            place.src = e.target.result;
            //console.log('nenene');
        }
        var xhr = new XMLHttpRequest();
        // Отправим данные на сервер
        xhr.open("POST", "/rest/upload/", true);
        /*
        xhr.upload.onprogress = function(e) { // <<<
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
            }
        };
        */
        xhr.onreadystatechange=function(e){
            $rootScope.$apply(function(){
                if (xhr.readyState == 4) {
                    call(xhr.responseText);
                }
            });
        };
        xhr.send(formData);
    };


    return FileFactory;
}]);
//***************************************** FileFactory ****************************************************//

app.factory('SchoolFactory',['$http','$rootScope','ErrorLogFactory',function($http,$rootScope,ErrorLogFactory) {
    var SchoolFactory={};
    var schoolBroker="/dance-school";
    SchoolFactory.CreateSchool=function(data) {
        return $http.post("/dance-admin/CreateSchool/",data);
    };
    SchoolFactory.GetSchools=function(){
        return $http.get(BaseUrl+"/GetSchools/");
    };
    SchoolFactory.GetSchool=function(IdSchool){
        return $http.get(BaseUrl+"/GetSchool/"+IdSchool);
    };
    SchoolFactory.Update=function(data){
        return $http.post(schoolBroker+"/UpdateSchool/",data);
    };
    SchoolFactory.AddRoomToSchool=function(data){
        return $http.post(schoolBroker+"/CreateRoom/",data);
    };
    SchoolFactory.GetAllRoomsForSchool=function(){
        return $http.get(schoolBroker + "/GetAllRoomsForSchool/");
    };
    SchoolFactory.UpdateRoom=function(data){
        return $http.post(schoolBroker + "/UpdateRoom/",data);
    };
    SchoolFactory.DeleteRoom=function(IdRoom){
        return $http.delete(schoolBroker+"/DeleteRoom/"+IdRoom);
    };
    SchoolFactory.UpdateAddress=function(data){
        return $http.post(schoolBroker + "/UpdateAddress/",data);
    };
    SchoolFactory.GetAddress=function(IdAddress){
        return $http.get(BaseUrl + "/GetAddress/"+IdAddress);
    };
    SchoolFactory.GetLessonTypes=function(){
        return $http.get(schoolBroker + "/GetLessonTypes/");
    };
    SchoolFactory.AddPrice=function(data){
        return $http.post(schoolBroker+"/AddPrice/",data);
    };
    SchoolFactory.GetPrice=function(ID){
        return $http.get(schoolBroker + "/GetPrice/"+ID);
    };
    SchoolFactory.InviteInstructor=function(email){
        return $http.get(schoolBroker + "/InviteInstructor/"+email);
    };
    SchoolFactory.InviteAccept=function(hash){
        return $http.post(BaseUrl + "/InviteAccept/"+hash);
    };
    SchoolFactory.InviteReject=function(hash) {
        return $http.post(BaseUrl + "/InviteReject/"+hash);
    };
    SchoolFactory.CreateNewInstructor=function(user){
        return $http.post(BaseUrl + "/CreateNewInstructor/",user);
    };
    SchoolFactory.GetInstructorList=function(idschool){
        return $http.get(BaseUrl+"/GetInstructorList/"+idschool)
    };
    SchoolFactory.RemoveFromSchool=function(ID){
        return $http.get(schoolBroker+"/RemoveFromSchool/"+ID)
    };
    SchoolFactory.AddLessonInTable=function(data){
        return $http.post(schoolBroker+"/AddLessonInTable/",data)
    };
    SchoolFactory.UpdateLessonInTable=function(data){
        return $http.post(schoolBroker+"/UpdateLessonInTable/"+data.ID,data)
    };
    SchoolFactory.RemoveLessonFromTable=function(id){
        return $http.post(schoolBroker+"/RemoveLessonFromTable/"+ID)
    };
    SchoolFactory.GetLessonsFromTable=function(){
        return $http.get(schoolBroker+"/GetLessonsFromTable/")
    };
    SchoolFactory.GetLesson=function(id){
        return $http.get(BaseUrl+"/GetLesson/"+id);
    }
    return SchoolFactory;
}]);


//***************************************** Setting ********************************************************************//
app.factory('SettingFactory',['$http','$rootScope','ErrorLogFactory',function($http,$rootScope,ErrorLogFactory){
    var SettingFactory={};
    SettingFactory.GetSettings=function(){
        return $http.get(BaseUrl+'/GetSettings/')
            .success(function(data, status, headers, config){
                if(document.getElementById("vacancy")){
                    document.getElementById("vacancy").style.backgroundImage="url('img/"+data.children[0].VacancyImage+"')";
                }
                if(document.getElementById("company")){
                    document.getElementById("company").style.backgroundImage="url('img/"+data.children[0].CompanyImage+"')";
                }
                if(document.getElementById("catalog")){
                    document.getElementById("catalog").style.backgroundImage="url('img/"+data.children[0].CatalogImage+"')";
                }
                if(document.getElementById("event")){
                    document.getElementById("event").style.backgroundImage="url('img/"+data.children[0].EventImage+"')";
                }
                if(document.getElementById("about")){
                    document.getElementById("about").style.backgroundImage="url('img/"+data.children[0].AboutImage+"')";
                }
            })
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };

    return SettingFactory;
}]);
//***************************************** Setting ********************************************************************//