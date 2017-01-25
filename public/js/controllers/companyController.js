/**
 * Created by zendynamix on 20-11-2016.
 */

billApp.controller("settingsCtrl", function ($scope,$state,companyService) {
    $scope.settingsCtrl = {
        detailsArray:[],
        deleteMessage:"",
       updateMessage:""
    }
    $scope.companyJsonConfig=companyService.getCompanyFromConfig();
    $scope.$on('fromData', function(event, fromDetails) {
        var CompanyDetails={}
        for(var l=0;l< fromDetails.length;l++)
        {
            CompanyDetails[fromDetails[l].realName]=fromDetails[l].model
        }
        saveCompanyDetailsToDb(CompanyDetails)

    });
    function  saveCompanyDetailsToDb(CompanyDetails){
        companyService.saveCompanyDetails(CompanyDetails).then(function (resultDetails) {
            console.log(resultDetails)
        }, function error(errResponse) {
            console.log(errResponse)
        })
    }


    $scope.editCompanyDetails=function(companyDetails){
        console.log("***")
        console.log(companyDetails)
        companyService.updateCompanyDetails(companyDetails).then(function(res){
            $scope.settingsCtrl.updateMessage=res.data;
        })
    }
    $scope.deleteCompanyDetails=function(companyMongoDbId){
        companyService.deleteCompanyDetails(companyMongoDbId).then(function(res){
            $scope.settingsCtrl.deleteMessage=res.data;
            $scope.getCompanyDetailsByRange(0)
        })
    }

    $scope.getCompanyDetailsByRange=function(pageNo){
        var pageCapacity =10;
        var start = 0;
        companyService.getCompanyDetailsByRange(start,pageCapacity).then(function(res){
            $scope.settingsCtrl.detailsArray=res.data;
        })
    }

    function init(){
        $scope.getCompanyDetailsByRange(0)

    }
    init()


})



