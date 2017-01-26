/**
 * Created by dhanalakshmi on 27-12-2016.
 */



var angularFromUI=angular.module('angularFromUI',[]);

angularFromUI.directive('jsonFrom', function() {
   /* var link=function (scope, element, attrs) {
        console.log("directivedirective")
        console.log(scope.jsonConfig)

        if(scope.jsonConfig){
            var modifiedJsonArray=createForm(scope.jsonConfig)
            if(modifiedJsonArray){
                scope.filedsArray =modifiedJsonArray;
            }
        }

        function createForm(jsonConfiguration) {
            var extractedData=[];
            var label=[]
            var k = Object.keys(jsonConfiguration);
            k.forEach(function (objkey, index) {

                var obj = {
                    "name": splitCamelCase(objkey),
                    "realName": objkey,
                    "type": jsonConfiguration[k[index]].type,
                    "description": jsonConfiguration[k[index]].description

                };

                extractedData.push(obj);

            });

            return extractedData;

        }
        function splitCamelCase (s) {
            return s.split(/(?=[A-Z])/).join(' ').split('_').join(' ').split('-').join(' ');
        };

    };*/
    return {
        scope: {
            jsonConfig:'='
        },
        /*link: link,*/
        templateUrl:'./directives/fromDirective/template.html',
    };
});






