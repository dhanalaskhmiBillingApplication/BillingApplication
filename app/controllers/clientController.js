/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    clientDetailsModel = mongoose.model('ClientDetails');
ClientFromConfig=require('../fromConfig/clients.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/ClientJsonConfig', function (req, res) {
    res.send(ClientFromConfig);
});

router.post('/ClientDetails', function(req, res, next) {
    var newClientDetails = new clientDetailsModel(req.body);
    newClientDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("Client Details added sucessfully");
    });

})

router.get('/ClientDetails/count', function (req, res){
    clientDetailsModel.count(function(err,clientCount){
        if(err)
            res.send(err);
        var count = {clientCount: clientCount};
        res.send(count);
    });
})

router.get('/ClientDetails/:start/:range', function (req, res) {
    console.log("server side")
    clientDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/ClientDetails/:id', function (req, res){
    clientDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' clientDetails   Deleted')
    });
})

router.get('/ClientDetails', function (req, res) {
    clientDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.post('/ClientDetails/update', function (req, res) {

    clientDetailsModel.findOne({'CompanyName':req.body.CompanyName}, function (err, Details) {
        if (err)
            res.send(err);

        if(Details){
            Details.CustomerTinNumber=req.body.CustomerTinNumber;
            Details.CustomerName=req.body.CustomerName;
            Details.CustomerLogo=req.body.CustomerLogo;
            Details.CompanyName=req.body.CompanyName;
            Details.StreetAddress=req.body.StreetAddress;
            Details.City=req.body.City;
            Details.State=req.body.State;
            Details.ZipCode=req.body.ZipCode;
            Details.PhoneNumber=req.body.PhoneNumber;
            Details.save(function(err){
                if(err)
                    res.send(err)

                res.send(' successfully updated')
            })
        }

    });
})


router.get('/ClientDetails/:clientId', function (req, res) {
    console.log(req.params.clientId)
    clientDetailsModel.find({_id:req.params.clientId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/ClientDetails/name', function (req, res) {
    clientDetailsModel.find({'CompanyName':req.body.CompanyName},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            console.log("999999999999999resultresultresult99999999999999999999")
            console.log(result)
            res.send(result)
        }

    })
})


router.get('/ClientDetailsName', function (req, res) {
    clientDetailsModel.find({},{"_id":0,"CompanyName":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
