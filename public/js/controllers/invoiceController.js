/**
 * Created by dhanalakshmi on 26-12-2016.
 */
billApp.controller("invoiceCtrl", function ($scope,clientService,productService) {
    $scope.invoice={
        selectedClient:"",
        allProducts:[],
        productList:[],
        previewList:[],
        clientDetails:{}
    }
    $scope.previewListView=false;
    $scope.InvoiceTable=true;
    $scope.saveToProductTable=function(productObj){
        for(var l=0;l<$scope.invoice.allProducts.length;l++){
            console.log(productObj.qty)
            if($scope.invoice.allProducts[l].ProductName===productObj.productSelected.ProductName){
                var obj={}
                obj.itemsData=$scope.invoice.allProducts[l];
                obj.qty=productObj.qty

                $scope.invoice.productList.push(obj)
            }
        }

    }
    $scope.editProduct=function(productName){
        for(var l=0;l<$scope.invoice.productList.length;l++){
            console.log(productName)
            console.log($scope.invoice.productList[l].itemsData.ProductName)
            if($scope.invoice.productList[l].itemsData.ProductName===productName){
                var editobj={}
                editobj.ProductName=$scope.invoice.productList[l].itemsData.ProductName
                editobj.qty=$scope.invoice.productList[l].qty
                $scope.editObjDetails=editobj
                console.log("$scope.editObjDetails$scope.editObjDetails$scope.editObjDetails")
               console.log($scope.editObjDetails)
            }
        }

    }
    $scope.updateList=function(editObj){
        $scope.deleteProduct(editObj.ProductName);
        $scope.updateTable(editObj)

    }
    $scope.updateTable=function(productObj){
        for(var l=0;l<$scope.invoice.allProducts.length;l++){
            console.log(productObj.ProductName)
            console.log(productObj.qty)
            if($scope.invoice.allProducts[l].ProductName===productObj.ProductName){
                var obj={}
                obj.itemsData=$scope.invoice.allProducts[l];
                obj.qty=productObj.qty

                $scope.invoice.productList.push(obj)
            }
        }
    }
    $scope.deleteProduct=function(name){
        for(var l=0;l<$scope.invoice.productList.length;l++){
            console.log(name)
            console.log($scope.invoice.productList[l].itemsData.ProductName)
            if($scope.invoice.productList[l].itemsData.ProductName===name){
                var index = $scope.invoice.productList.indexOf($scope.invoice.productList[l].itemsData.ProductName);
                $scope.invoice.productList.splice(index, 1);
            }
        }
    }
    $scope.getAllClientNameForDropDown=function(){
        clientService.getAllClientName().then(function(res){
            $scope.itemsnames = res.data;
        })

    }
    $scope.saveSelectedClient=function(clientName){

        var obj={}
        obj.CompanyName=clientName[0].CompanyName
        clientService.getClientDetailsByName(obj).then(function(res){
            console.log("88888888888888888")
            console.log(res.data[0])
            $scope.invoice.clientDetails = res.data[0];
        })
    }
    $scope.getAllProductNameForDropDown=function(){
        productService.getAllProductName().then(function(res){
            $scope.productNames = res.data;
        })

    }
    $scope.getAllProduct=function(){
        productService.getAllProduct().then(function(res){
            $scope.invoice.allProducts = res.data;
        })

    }
    $scope.getAllProductNameForDropDown()
    $scope.getAllClientNameForDropDown()
    $scope.getAllProduct()
    $scope.previewProductList=function(){

       console.log( $scope.invoice.productList)
        var totalCost=0
        var finalProductArray=[]
        for(var k=0;k<$scope.invoice.productList.length;k++){
            console.log($scope.invoice.productList[k].itemsData)
            console.log($scope.invoice.productList[k].qty)
            var obj={}
            obj.ProductName=$scope.invoice.productList[k].itemsData.ProductName
            obj.ProductDescription=$scope.invoice.productList[k].itemsData.ProductDescription
            obj.ProductAvailableQty=$scope.invoice.productList[k].itemsData.ProductAvailableQty
            obj.unitPrice=$scope.invoice.productList[k].itemsData.unitPrice
            obj.qty=$scope.invoice.productList[k].qty
            obj.perProductCost=$scope.invoice.productList[k].itemsData.unitPrice*$scope.invoice.productList[k].qty
            obj.totalCostProduct=totalCost+obj.perProductCost
            finalProductArray.push(obj)
        }
        $scope.invoice.previewList=finalProductArray;
    }


    })
