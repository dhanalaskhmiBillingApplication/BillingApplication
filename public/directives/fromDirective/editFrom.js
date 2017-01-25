/**
 * Created by dhanalakshmi on 27-12-2016.
 */



var angularEditFromUI=angular.module('angularEditFromUI',[]);

angularEditFromUI.directive('editFrom', function() {

  /*  var link=function (scope, element, attrs) {


    };*/
    return {
        scope: {
            jsonConfig:'='
        },
       /* link: link,*/
        templateUrl:'./directives/fromDirective/editJsonTemplate.html'
    };
});






