/**
 * Created by zendynamix on 20-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/company.json')
    schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var companySchema = new mongoose.Schema(
    schemaObject,{collection: "companyDetails"});

module.exports =mongoose.model('companyDetails',companySchema);
