/**
 * Created by dhanalakshmi on 31-12-2016.
 */
billApp.factory("fromService", function ($http) {

    var convertJsonToArray = function(jsonConfiguration){
        var extractedData=[];
        var label=[]
        var k = Object.keys(jsonConfiguration);
        k.forEach(function (objkey, index) {

            var obj = {
                "name": splitCamelCase(objkey),
                "realName": objkey,
                "type": jsonConfiguration[k[index]].type,
                "description": jsonConfiguration[k[index]].description,
                "modelValue": jsonConfiguration[k[index]].modelValue

            };
            extractedData.push(obj);
        });
        return extractedData;

    }

    function splitCamelCase (s) {
        return s.split(/(?=[A-Z])/).join(' ').split('_').join(' ').split('-').join(' ');
    };

    return{
        convertJsonToArray:convertJsonToArray
    }
})