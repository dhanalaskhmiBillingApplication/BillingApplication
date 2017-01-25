/**
 * Created by zendynamix on 25-11-2016.
 */
billApp.controller("productCtrl", function ($scope,productService,fromService) {
    $scope.productDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:""
    }

    $scope.getProductDetailsByRange=function(pageNo){
        var pageCapacity =10;
        var start = 0;
        productService.getProductDetailsByRange(start,pageCapacity).then(function(res){
            $scope.productDetails.detailsArray=res.data;
        })
    }

    $scope.editProductDetails=function(productDetails){
        console.log("***")
        console.log(productDetails)
        productService.updateProductDetails(productDetails).then(function(res){
            $scope.productDetails.updateMessage=res.data;
        })
    }
    $scope.deleteProductDetails=function(ProductMongoDbId){
        productService.deleteProductDetails(ProductMongoDbId).then(function(res){
            $scope.productDetails.deleteMessage=res.data;
            $scope.getProductDetailsByRange(0)
        })
    }
    $scope.getConfigForProductSaveFrom=function(){
        var modifiedSaveConfig=fromService.convertJsonToArray(productService.getProductFromConfig())
        $scope.productJsonConfig=modifiedSaveConfig

    }
    $scope.saveProductDetails=function(productDetails){
        console.log(productDetails)
        $scope.unquieProductNameError=""
        for(var k=0;k<productDetails.length;k++){
            if(productDetails[k].realName==="ProductName"){
                productService.getProductDetailsByName(productDetails[k].modelValue).then(function(res){
                    console.log(res.data[0])
                    if(res.data[0]){
                        $scope.unquieProductNameError="Product name already exists"
                    }
                    else{
                        var saveObj={}
                        var productSaveObj={}
                        for(var k=0;k<productDetails.length;k++){
                            saveObj=productDetails[k]
                            productSaveObj[saveObj.realName]=saveObj.modelValue
                            if(k===productDetails.length-1){
                                productService.saveProductDetails(productSaveObj).then(function (resultDetails) {
                                    $scope.getProductDetailsByRange(0)
                                    console.log(resultDetails)
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

    $scope.getProductDetailsById=function(mongodbId){
        productService.getProductDetailsById(mongodbId).then(function(res){
            MergeEditFrom(res.data[0], productService.getProductFromConfig())
        })
    }

    function MergeEditFrom(productDetails,productFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(productFromConfig);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=productFromConfig[k[index]].description
            obj.modelValue=productDetails[objkey]
            obj.type=productFromConfig[k[index]].type
            editObj[objkey]=obj
        });
        var productEditObj=fromService.convertJsonToArray(editObj)

        $scope.productEditJsonConfig=productEditObj;


    }
    $scope.updateProductDetailsToDb=function(productDetails){
        var editObj={}
        var productEditObj={}
        for(var k=0;k<productDetails.length;k++){
            editObj=productDetails[k]
            productEditObj[editObj.realName]=editObj.modelValue
            if(k===productDetails.length-1){

                productService.updateProductDetails(productEditObj).then(function(res){

                    $scope.getProductDetailsByRange(0)
                })
            }


        }
    }
    $scope.setProductDetailsIdForDelete=function(mongodbId){
        $scope.productDetails.mongodbIdForDelete=mongodbId;

    }
    $scope.deleteClientDetails=function(productMongoDbId){
        productService.deleteProductDetails(productMongoDbId).then(function(res){
            $scope.productDetails.deleteMessage=res.data;
            $scope.getProductDetailsByRange(0)
        })
    }

    function init(){
        $scope.getProductDetailsByRange(0)
    }
    init();
})