/**
 * Created by zendynamix on 25-11-2016.
 */
billApp.controller("clientCtrl", function ($scope,clientService,fromService) {
    $scope.clientDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:""
    }

    $scope.clientEditJsonConfig={}
    $scope.emptyClientFrom=function(){
        $scope.clientJsonConfig={}
    }
    $scope.saveClient=function(clientDetailsArray){
        var clientDetailsObj={}
        saveClientDetailsToDb(clientDetailsArray)
    }

    function  saveClientDetailsToDb(clientDetails){
        $scope.unquieClientNameError=""
        for(var k=0;k<clientDetails.length;k++){
            if(clientDetails[k].realName==="CompanyName"){
                var obj={}
                obj.companyName=clientDetails[k].modelValue
                clientService.getClientDetailsByName(obj).then(function(res){
                    if(res.data[0]){
                        $scope.unquieClientNameError="client name already exists"
                    }
                    else{
                        var saveObj={}
                        var clientSaveObj={}
                        for(var k=0;k<clientDetails.length;k++){
                            saveObj=clientDetails[k]
                            clientSaveObj[saveObj.realName]=saveObj.modelValue
                            if(k===clientDetails.length-1){
                                clientService.saveClientDetails(clientSaveObj).then(function (resultDetails) {
                                    console.log(resultDetails)
                                    $scope.getClientDetailsByRange(0)
                                }, function error(errResponse) {
                                    console.log(errResponse)
                                })
                            }


                        }

                    }
                })
            }
        }




    }
    $scope.getClientDetailsByRange=function(pageNo){

        var pageCapacity =10;
        var start = 0;
        clientService.getClientDetailsByRange(start,pageCapacity).then(function(res){
            $scope.clientDetails.detailsArray=res.data;
        })
    }


    $scope.updateClientDetailsToDb=function(clientDetails) {
        var editObj={}
        var clientEditObj={}
        for(var k=0;k<clientDetails.length;k++){
            editObj=clientDetails[k]
            clientEditObj[editObj.realName]=editObj.modelValue
            if(k===clientDetails.length-1){
                console.log("else")
                console.log(clientEditObj)
                clientService.updateClientDetails(clientEditObj).then(function(res){
                    $scope.clientDetails.updateMessage=res.data;
                    $scope.getClientDetailsByRange(0)
                })
            }


        }





    }
    $scope.deleteClientDetails=function(clientMongoDbId){
        clientService.deleteClientDetails(clientMongoDbId).then(function(res){
            $scope.clientDetails.deleteMessage=res.data;
            $scope.getClientDetailsByRange(0)
        })
    }

    $scope.getClientDetailsById=function(mongodbId){
        clientService.getClientDetailsById(mongodbId).then(function(res){
            MergeEditFrom(res.data[0], clientService.getClientFromConfig())
        })
    }

    function MergeEditFrom(clientDetails,clientFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(clientFromConfig);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=clientFromConfig[k[index]].description
            obj.modelValue=clientDetails[objkey]
            obj.type=clientFromConfig[k[index]].type
            editObj[objkey]=obj
        });
        var clientEditObj=fromService.convertJsonToArray(editObj)

        $scope.clientEditJsonConfig=clientEditObj;


    }
    $scope.setClientDetailsIdFroDelete=function(mongodbId){
        $scope.clientDetails.mongodbIdForDelete=mongodbId;

    }
    $scope.getConfigForClientSaveFrom=function(){
        var modifiedSaveConfig=fromService.convertJsonToArray(clientService.getClientFromConfig())
        $scope.clientJsonConfig=modifiedSaveConfig

    }

     function init(){
         $scope.getClientDetailsByRange(0)
         $scope.getConfigForClientSaveFrom()
     }
    init()
})