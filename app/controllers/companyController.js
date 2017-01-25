/**
 * Created by Suhas on 3/8/2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    companyDetailsModel = mongoose.model('companyDetails');
    companyFromConfig=require('../fromConfig/company.json')
        schemaUtility=require('../utility').fromSchema
    module.exports = function (app){
        app.use('/', router);
    };


router.get('/CompanyJsonConfig', function (req, res) {
   res.send(companyFromConfig);
});



router.post('/companyDetails', function(req, res, next) {
    var newCompanyDetails = new companyDetailsModel(req.body);
    newCompanyDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        console.log('User Registration succesful');
        res.send("user added sucessfully");
    });

})

router.get('/companyDetails/count', function (req, res){
    companyDetailsModel.count(function(err,companyCount){
        if(err)
            res.send(err);
        var count = {companyCount: companyCount};
        res.send(count);
    });
})

router.get('/companyDetails/:start/:range', function (req, res) {
    console.log("server side")
    companyDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})



router.delete('/companyDetails/:id', function (req, res){
    companyDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' companyDetails Deleted')
    });
})

router.get('/companyDetails', function (req, res) {
    companyDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.post('/companyDetails/update', function (req, res) {
    companyDetailsModel.findOne({'_id':req.body._id}, function (err, companyDetails) {
        if (err)
            res.send(err);
        if(companyDetails){
            companyDetails.companyName=req.body.companyName;
            companyDetails.streetAddress=req.body.streetAddress;
            companyDetails.city=req.body.city;
            companyDetails.Street=req.body.Street;
            companyDetails.ZipCode=req.body.ZipCode;
            companyDetails.Phone=req.body.Phone;
            companyDetails.Fax=req.body.Fax;
            companyDetails.webSite=req.body.webSite;
            companyDetails.Logo=req.body.Logo;

            companyDetails.save(function(err){
                if(err)
                    res.send(err)

                res.send(' successfully updated')
            })
        }

    });
})



