/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    productFromConfig=require('../fromConfig/product.json');
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(productFromConfig);

var ProductsDetailsSchema = new mongoose.Schema(
    schemaObject,{collection: "productDetails"});

module.exports =mongoose.model('productDetails',ProductsDetailsSchema);