/**
 * Created by dhanalakshmi on 15-01-2017.
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