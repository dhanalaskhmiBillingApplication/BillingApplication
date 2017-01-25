/**
 * Created by zendynamix on 25-11-2016.
 */
billApp.factory("clientService", function ($http) {
    var formConfigObj={};
    var clientCount;
    var getClientJsonConfig = function(){
        return $http.get('/ClientJsonConfig');
    }
    var setClientFromConfig=function(formConfig){
        formConfigObj=formConfig
    }
    var getClientFromConfig=function(){
        return formConfigObj
    }
    var saveClientDetails = function(clientData){
        return $http.post('/ClientDetails',clientData);
    }
    var getClientDetailsByRange=function(start,range){
        return $http.get('/ClientDetails/'+start+'/'+range);
    }
    var getClientDetailsCount = function(){
        return $http.get('/ClientDetails/count');
    }
    var getClientCount = function(){
        return clientCount;
    }
    var setClientCount = function(val){
        clientCount=val;
    }
    var updateClientDetails = function(companyDetails){
        return $http.post('/ClientDetails/update',companyDetails)
    }
    var deleteClientDetails = function(id){
        return $http.delete('/ClientDetails/'+id);
    }
  var getClientDetailsById = function(id){
        return $http.get('/ClientDetails/'+id);
    }

    var getClientDetailsByName = function(clientName){
        console.log("99999999999999999999999999999999999")
        console.log(clientName)
        console.log("99999999999999999999999999999999999")

        return $http.post('/ClientDetails/name',clientName);
    }

    var getAllClientName = function(){
        return $http.get('/ClientDetailsName');
    }




    return{
        getClientJsonConfig:getClientJsonConfig,
        setClientFromConfig:setClientFromConfig,
        getClientFromConfig:getClientFromConfig,
        saveClientDetails:saveClientDetails,
        getClientDetailsByRange:getClientDetailsByRange,
        getClientDetailsCount:getClientDetailsCount,
        getClientCount:getClientCount,
        setClientCount:setClientCount,
        updateClientDetails:updateClientDetails,
        deleteClientDetails:deleteClientDetails,
        getClientDetailsById:getClientDetailsById,
        getClientDetailsByName:getClientDetailsByName,
        getAllClientName:getAllClientName
    }
})