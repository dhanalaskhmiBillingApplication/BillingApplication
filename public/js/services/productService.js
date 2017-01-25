/**
 * Created by zendynamix on 25-11-2016.
 */
/**
 * Created by zendynamix on 25-11-2016.
 */
billApp.factory("productService", function ($http) {
    var formConfigObj={};
    var productCount;
    var getProductJsonConfig = function(){
        return $http.get('/productJsonConfig');
    }
    var setProductFromConfig=function(formConfig){
        formConfigObj=formConfig
    }
    var getProductFromConfig=function(){
        return formConfigObj
    }
    var saveProductDetails = function(productData){
        return $http.post('/productDetails',productData);
    }
    var getProductDetailsByRange=function(start,range){
        return $http.get('/productDetails/'+start+'/'+range);
    }
    var getProductDetailsCount = function(){
        return $http.get('/productDetails/count');
    }
    var getProductCount = function(){
        return productCount;
    }
    var setProductCount = function(val){
        productCount=val;
    }
    var updateProductDetails = function(productDetails){
        return $http.post('/productDetails/update',productDetails)
    }
    var deleteProductDetails = function(id){
        return $http.delete('/productDetails/'+id);
    }

    var getProductDetailsByName = function(productName){
        return $http.get('/productDetails/'+productName);
    }

    var getProductDetailsById = function(productId){
        return $http.get('/productDetailsById/'+productId);
    }

    var getAllProductName= function(){
        return $http.get('/productDetailsName');
    }
    var getAllProduct= function(){
        return $http.get('/allProductDetails');
    }


    return{
        getProductJsonConfig:getProductJsonConfig,
        setProductFromConfig:setProductFromConfig,
        getProductFromConfig:getProductFromConfig,
        saveProductDetails:saveProductDetails,
        getProductDetailsByRange:getProductDetailsByRange,
        getProductDetailsCount:getProductDetailsCount,
        getProductCount:getProductCount,
        setProductCount:setProductCount,
        updateProductDetails:updateProductDetails,
        deleteProductDetails:deleteProductDetails,
        getProductDetailsByName:getProductDetailsByName,
        getProductDetailsById:getProductDetailsById,
        getAllProductName:getAllProductName,
        getAllProduct:getAllProduct
    }
})