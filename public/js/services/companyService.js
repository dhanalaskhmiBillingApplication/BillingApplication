/**
 * Created by zendynamix on 20-11-2016.
 */
billApp.factory("companyService", function ($http) {
        var formConfigObj={};
    var companyCount;
    var getCompanyJsonConfig = function(){
        return $http.get('/CompanyJsonConfig');
    }
    var setCompanyFromConfig=function(formConfig){
        formConfigObj=formConfig
    }
    var getCompanyFromConfig=function(){
        return formConfigObj
    }
    var saveCompanyDetails = function(companyData){
        return $http.post('/companyDetails',companyData);
    }
    var getCompanyDetailsByRange=function(start,range){

        return $http.get('/companyDetails/'+start+'/'+range);
    }
    var getDetailsCompanyCount = function(){
        return $http.get('/companyDetails/count');
    }
    var getCompanyCount = function(){
        return companyCount;
    }
    var setCompanyCount = function(val){
        companyCount=val;
    }
    var updateCompanyDetails = function(companyDetails){
        return $http.post('/companyDetails/update',companyDetails)
    }
    var deleteCompanyDetails = function(id){
        return $http.delete('/companyDetails/'+id);
    }



    return{
        getCompanyJsonConfig:getCompanyJsonConfig,
        setCompanyFromConfig:setCompanyFromConfig,
        getCompanyFromConfig:getCompanyFromConfig,
        saveCompanyDetails:saveCompanyDetails,
        getCompanyDetailsByRange:getCompanyDetailsByRange,
        getDetailsCompanyCount:getDetailsCompanyCount,
        getCompanyCount:getCompanyCount,
        setCompanyCount:setCompanyCount,
        updateCompanyDetails:updateCompanyDetails,
        deleteCompanyDetails:deleteCompanyDetails
    }
})