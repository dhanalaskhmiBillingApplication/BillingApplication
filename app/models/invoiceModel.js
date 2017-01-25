/**
 * Created by dhanalakshmi on 15-01-2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber:Number,
        InvoiceRaisedDate:Date,
        InvoiceDueDate:Date,
        clientName:String,
        productOrderDetails:[{
            productName:String,
            Quantity:Number
        }],
        subTotal:Number,
        generatedTax:Number,
        TotalInvoiceCost:Number,
        DueAmount:Number
    },{collection:'invoice'});
mongoose.model('invoice', invoiceSchema);