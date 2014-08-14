/**
 * Created by Victor77 on 10.12.13.
 */
var app=angular.module('Dance.services', []);
var BaseUrl='/dance-admin/';
//***************************************** User ******************************************************************//
app.factory('UserFactory',['$http','ErrorLogFactory',function($http,ErrorLogFactory){
    var UserFactory={};
    var user="User";
    UserFactory.GetAll= function(){
        return $http.get(BaseUrl+user+'/GetAll')
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    UserFactory.Get= function(UserID){
        return $http.get(BaseUrl+user+'/Get/'+UserID)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    UserFactory.Create=function(data){
        return $http.post(BaseUrl+user+'/Create',data)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                alert(data);
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    UserFactory.Update=function(data){
        return $http.post(BaseUrl+user+'/Update',data)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                alert(data);
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    UserFactory.Delete=function(UserID){
        return $http.delete(BaseUrl+user+'/Delete/'+UserID)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    return UserFactory;
}]);
//***************************************** User ******************************************************************//

//***************************************** User ******************************************************************//
app.factory('SchoolFactory',['$http','ErrorLogFactory',function($http,ErrorLogFactory){
    var SchoolFactory={};
    var school="School";
    SchoolFactory.GetAll= function(){
        return $http.get(BaseUrl+school+'/GetAll')
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    SchoolFactory.Get= function(SchoolID){
        return $http.get(BaseUrl+school+'/Get/'+SchoolID)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    SchoolFactory.Create=function(data){
        return $http.post(BaseUrl+school+'/Create',data)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                alert(data);
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    SchoolFactory.Update=function(data){
        return $http.put(BaseUrl+school+'/Update',data)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){

                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    SchoolFactory.Delete=function(SchoolID){
        return $http.delete(BaseUrl+school+'/Delete/'+SchoolID)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    return SchoolFactory;
}]);
//***************************************** User ******************************************************************//


//***************************************** AuthenticationFactory ****************************************************//
app.service('AuthenticationFactory',['$http','ErrorLogFactory',function($http,ErrorLogFactory){
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
        AuthenticationFactory.CurrentUser.ID=AuthenticationFactory.GetCookie('ID');
        AuthenticationFactory.CurrentUser.Email=AuthenticationFactory.GetCookie('Email');
        AuthenticationFactory.CurrentUser.Login=AuthenticationFactory.GetCookie('Login');
        AuthenticationFactory.CurrentUser.UserName=AuthenticationFactory.GetCookie('UserName');
        AuthenticationFactory.CurrentUser.UserImage=AuthenticationFactory.GetCookie('UserImage');
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
        return $http.post('/vacancy-user/json/Login/',data)
            .success(function(data, status, headers, config){

            })
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    AuthenticationFactory.Logout=function(){
        return $http.post('/vacancy-user/json/Logout/',AuthenticationFactory.GetCurrentUser())
            .success(function(data, status, headers, config){
                AuthenticationFactory.CleanCurrentUser();})
            .error(function(data, status, headers, config){
                ErrorLogFactory.CreateErrorLog({data:data,status:status,headers:headers,config:config});
            });
    };
    return AuthenticationFactory;
}]);
//***************************************** AuthenticationFactory ****************************************************//


//***************************************** Language *****************************************************************//
app.factory('LanguageFactory',['$http','$rootScope','ErrorLogFactory',function($http,$rootScope,ErrorLogFactory){
    var LanguageFactory={};
    LanguageFactory.SetInterfaceLanguage=function(Language){
        return $http.get('lang/admin/'+Language+'.json').success(function(data){
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
    LanguageFactory.GetLanguage=function(){
        if(LanguageFactory.GetCurrentLanguage()=="ru"){ return 0;}
        if(LanguageFactory.GetCurrentLanguage()=="en"){ return 1;}
    };

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
//***************************************** Language *****************************************************************//

//***************************************** ErrorLog *****************************************************************//
app.factory('ErrorLogFactory',['$http','$rootScope',function($http,$rootScope){
    var ErrorLogFactory={};
    ErrorLogFactory.CreateErrorLog=function(data){
        data.Page=$rootScope.MenuActive.Page;
        data.Controller=$rootScope.MenuActive.Controller;
        return $http.post(BaseUrl+'/ErrorLog/',data);
    };
    return ErrorLogFactory;
}]);
//***************************************** ErrorLog *****************************************************************//

//***************************************** FileUpload ***************************************************************//
app.factory('FileFactory',['$http','$rootScope','ErrorLogFactory',function($http,$rootScope,ErrorLogFactory){
    var FileFactory={};
    FileFactory.FileUpload=function(InputName, OutputName){
        var formData = new FormData();
        for(var i=0;i<document.getElementById(InputName).files.length;i++){
            formData.append("fotofile"+i, document.getElementById(InputName).files[i]);
        }

        var reader = new FileReader;
        reader.readAsDataURL(document.getElementById(InputName).files[0]);
        var place = document.getElementById("rrr");

        // Как только картинка загрузится
        reader.onload = function(e) {
            place.src = e.target.result;
            //console.log('nenene');
        }




        var xhr = new XMLHttpRequest();

        // Отправим данные на сервер
        xhr.open("POST", "/vacancy-admin/json/FileUpload/", true);
        xhr.upload.onprogress = function(e) { // <<<
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
            }
        };

        xhr.onreadystatechange=function(e){
            if (xhr.readyState == 4) {
                var val = document.getElementById(OutputName);
                val.value=xhr.responseText;
            }
        };
        xhr.send(formData);
    };
    FileFactory.FileUploadWall=function(InputName, OutputName, OutputImage){
        var formData = new FormData();
        for(var i=0;i<document.getElementById(InputName).files.length;i++){
            formData.append("fotofile"+i, document.getElementById(InputName).files[i]);
        }

        var reader = new FileReader;
        reader.readAsDataURL(document.getElementById(InputName).files[0]);
        var place = document.getElementById(OutputImage);

        // Как только картинка загрузится
        reader.onload = function(e) {
            place.src = e.target.result;
            //console.log('nenene');
        }




        var xhr = new XMLHttpRequest();

        // Отправим данные на сервер
        xhr.open("POST", "/vacancy-admin/json/FileUpload/", true);
        xhr.upload.onprogress = function(e) { // <<<
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
            }
        };

        xhr.onreadystatechange=function(e){
            if (xhr.readyState == 4) {
                var val = document.getElementById(OutputName);
                val.value=xhr.responseText;
            }
        };
        xhr.send(formData);
    };


    return FileFactory;
}]);
//***************************************** FileUpload ***************************************************************//
