/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/clientsShippingAddress.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var clientsShippingAddressSchema = new mongoose.Schema(
    schemaObject,{collection: "clientsShippingAddress"});

module.exports =mongoose.model('clientsShippingAddress',clientsShippingAddressSchema);