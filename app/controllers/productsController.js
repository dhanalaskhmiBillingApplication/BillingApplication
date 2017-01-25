/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ProductsDetailsModel = mongoose.model('productDetails');
    ProductsFromConfig=require('../fromConfig/product.json')

    module.exports = function (app){
        app.use('/', router);
    };
router.get('/productJsonConfig', function (req, res) {
    res.send(ProductsFromConfig);
});

router.post('/productDetails', function(req, res, next) {
    console.log("****")
    console.log(req.body)
    var newProductDetails = new ProductsDetailsModel(req.body);
    newProductDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }

        res.send("product added sucessfully");
    });

})


router.get('/productDetails/count', function (req, res){
    ProductsDetailsModel.count(function(err,productCount){
        if(err)
            res.send(err);
        var count = {productCount: productCount};
        res.send(count);
    });
})

router.get('/productDetails/:start/:range', function (req, res) {
    console.log("server side")
    ProductsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/productDetails/:id', function (req, res){
    ProductsDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' companyDetails Deleted')
    });
})

router.get('/productDetails', function (req, res) {
    ProductsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.post('/productDetails/update', function (req, res) {
    ProductsDetailsModel.findOne({'ProductName':req.body.ProductName}, function (err, Details) {
        if (err)
            res.send(err);
        if(Details){
            Details.ProductName=req.body.ProductName;
            Details.ProductDescription=req.body.ProductDescription;
            Details.ProductAvailableQty=req.body.ProductAvailableQty;
            Details.unitPrice=req.body.unitPrice;
            Details.save(function(err){
                if(err)
                    res.send(err)

                res.send(' successfully updated')
            })
        }

    });
})

router.get('/productDetails/:productName', function (req, res) {
    console.log(req.params.productName)
    ProductsDetailsModel.find({ProductName:req.params.productName},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.get('/productDetailsById/:productId', function (req, res) {
    console.log(req.params.productId)
    ProductsDetailsModel.find({_id:req.params.productId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.get('/productDetailsName', function (req, res) {
    ProductsDetailsModel.find({},{"_id":0,"ProductName":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.get('/allProductDetails', function (req, res) {
    ProductsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
