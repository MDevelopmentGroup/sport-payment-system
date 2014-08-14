/**
 * Created by Victor77 on 16.02.14.
 */


angular.module('Dance.directive', ['mgcrea.ngStrap'])
.directive("redactor", function() {
    return {
        require: '?ngModel',
        link: function($scope, elem, attrs, controller) {
            controller.$render = function() {
                elem.redactor({
                    keyupCallback: function() {
                        $scope.$apply(controller.$setViewValue(elem.getCode()));
                    },
                    execCommandCallback: function() {
                        $scope.$apply(controller.$setViewValue(elem.getCode()));
                    }
                });
                elem.setCode(controller.$viewValue);
            };
        }
    };
})

.directive('fileUpload', function ($compile,$parse,FileUploadFactory) {
        var linker = function ($scope, element, attrs,ngModel) {
            var progress=0;
            var FileList=[];
            var options=$parse(attrs.options)();
            element.bind('change', function (event) {
                var files = event.target.files;
               // element.css('background-color','');
                element.css('background',"url('img/1.png') no-repeat");
                element.css('background-size',+'0%');
                FileUploadFactory.UploadFile(files,options,
                 function(data){
                      if(FileList){
                          FileList=ngModel.$viewValue;
                      }
                      else{

                          FileList=[];}
                     // console.log(typeof FileList);
                      FileList=FileList.concat(data);
                      $scope.$apply(function(){
                         ngModel.$setViewValue(FileList);
                      });
                } ,
                function(progress){
                       element.css('background-size',progress+'%');
                }
            );
            });
            element.bind('focus',function(event){
                FileList=ngModel.$viewValue;
            });
        };
        return {
            require: '?ngModel',
            restrict: 'A',
            link: linker
        };

 })
.directive('imageFull', function () {
        var linker = function ($scope, element, attrs,ngModel,transclusion) {
            var width;

            element.bind('mouseover',function(event){
                element.css({"width":"300px",
                            "position":'absolute',
                            "z-index":150,
                            "overflow":'visible'});
            });
            element.bind('mouseleave',function(event){
                element.css({"width":'30px',
                             "position":'',
                             "z-index":''});
            });
        };
        return {
            require: '?ngModel',
            restrict: 'A',
            link: linker
        };

    })

.directive('dragDrop', function ($parse,FileUploadFactory) {
        var linker = function (scope, element, attrs,ngModel) {
            var onImageDrop = $parse(attrs.onImageDrop);
            var options=$parse(attrs.options)();
            var FileList;
            var onDragOver = function (e) {
                e.preventDefault();
                $('body').addClass("dragOver");
            };
            var onDragEnd = function (e) {
                e.preventDefault();
                $('body').removeClass("dragOver");
            };
            var loadFile = function (file) {
                scope.uploadedFile = file;
                scope.$apply(onImageDrop(scope));
                var data=[];
                data[0]={name:scope.uploadedFile.name};

                var reader = new FileReader();
                reader.onload = function (event) {
                    element.css('background','url(' + event.target.result + ') no-repeat center')
                };
                reader.readAsDataURL(file);
            };
            $(document).bind("dragover", onDragOver);

            element.bind("dragleave", onDragEnd)
                .bind("drop", function (e) {
                    onDragEnd(e);
                   // loadFile(e.originalEvent.dataTransfer.files[0]);
                    FileUploadFactory.UploadFile(e.originalEvent.dataTransfer.files,options,function(data){


                        if(ngModel.$viewValue){FileList=ngModel.$viewValue;}
                        else{FileList=[];}
                        FileList=FileList.concat(data);
                        scope.$apply(function(){
                            ngModel.$setViewValue(FileList);
                        });
                    },function(data){
                       // console.log(data)
                    });
                });
            element.bind("mouseover", function(event){
                element[0].title="Переместите файл сюда";
            });

        };
        return {
            restrict:'A',
            require: '?ngModel',
          //  transclude: true,
            scope:{
                options:'@'
            },
            link: linker

        };

    })
.directive('fileList', function (FileUploadFactory) {
        var template=
            '<div style="overflow-y: auto; height: 250px">' +
                '<table class="table table-striped" >'+
                    '<tr>'+
                        '<th width="4%">ID</th>'+
                        '<th>View</th>'+
                        '<th>File Name</th>'+
                        '<th>options</th>'+
                    '</tr>'+
                    '<tr ng-repeat="item in items "  style="position: relative;">'+
                        '<td>{{item.ID}}</td>'+
                        '<td height="50" width="70"><img image-Full class="img-thumbnail" style="width: 30px;" src="img/ru.jpg"></td>'+
                        '<td>{{item.name}}</td>'+
                        '<td><button class="btn btn-danger btn-sm" data-ng-click="DeleteFile(item);items.splice($index, 1)"><span class="glyphicon glyphicon-trash"></span></button></td>'+
                    '</tr>'+
                '</table>' +
            '</div>';
        return {
            require: '?ngModel',
            restrict:'AE',
            scope:{
                items:'='
            },
            replace: false,
            controller:function($scope,$attrs){
                $scope.DeleteFile=function(data){
                    FileUploadFactory.DeleteFile(data);
                };
            },
            template: template
        };
    })
.factory('FileUploadFactory',function($http,FileUploadProvider){
        var FileUploadFactory={};
        FileUploadFactory.DeleteFile=function(data){
            return $http.post(FileUploadProvider.getOptions().DeleteUrl,data);
        };
        FileUploadFactory.UploadFile=function(files,Options,callback,progresscall){
            var FData = new FormData();
            var progress=0;
            var FileList=[];
            var TypeList=Options.TypeList;

            //console.log(TypeList.indexOf('png1'));
            var xhr = new XMLHttpRequest();
            var k=0;
            for(var i=0;i<files.length;i++){

                var type=files[i].name.split('.');

                var CurrentType=type[type.length-1];
                if(TypeList.indexOf(CurrentType)!==-1){
                   if(((files[i].size/1024)/1024).toFixed(4)<=FileUploadProvider.getOptions().MaxFileSize) {
                       FData.append(files[i].name, files[i]);
                       FileList[k]={
                           name:files[i].name,
                           size:files[i].size,
                           lastModifiedDate:files[i].lastModifiedDate
                       };
                       k++;
                   }
                    else
                   {
                       console.log('MaxFileSize: '+FileUploadProvider.getOptions().MaxFileSize+' MB');
                   }
                }
                else{
                    console.log('Current File Type: '+CurrentType+' is not support');
                }
            }
            xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var response=JSON.parse(xhr.responseText);
                        var ResultFiles=[];

                        if(response.length>0){
                            for(var i=0;i<FileList.length;i++){
                                ResultFiles[i]={
                                    name:FileList[i].name,
                                    size:FileList[i].size,
                                    lastModifiedDate:FileList[i].lastModifiedDate,
                                    ID:response[i].ID
                                };
                                console.log(ResultFiles)
                            }
                        }
                        callback(ResultFiles);
                    }
            };
            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.addEventListener("load", uploadComplete, false);

            function uploadProgress(evt) {
                if (evt.lengthComputable) {
                        progress = Math.round(evt.loaded * 100 / evt.total);
                        progresscall(progress);
                        if(evt.loaded === evt.total){
                        }
                } else {}
            }
            function uploadComplete(evt) {}
            xhr.open('POST',  FileUploadProvider.getOptions().url);
            xhr.send(FData);
        };
        return FileUploadFactory;
})


.provider('FileUploadProvider', function() {
    var Options={
        url:'/d/test',
        DeleteUrl:'/d/test',
        MaxFileSize:'3' //MB
    };
    return {

        setOptions: function(options) {
            Options = options;
        },
        $get: function() {
            function getOptions() {
                return Options;
            }
            return {
                getOptions: getOptions
            };
        }

    };

})
.directive('loginDirective',function($compile){
        var linker=function(scope, element, attrs,ngModel){

            var template='<form ng-model="p"><input type="text" ng-model="p.login"><input type="text" ng-model="p.pass"><button type="submit">OK()</button></form>';
            template=angular.element(template);
            $compile(template)(scope);
            element.html(template);
            console.log(scope, element, attrs,ngModel)
        };
        return {
            scope:{

            },
            link:linker
        };
    });