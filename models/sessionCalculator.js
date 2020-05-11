var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionCalculatorSchema = Schema({
  numberSession : {
    type : Number,
    required : 'The number is required'},
  expression : {
    type : String,
    required : 'The expression is required' }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('SessionCalculator', SessionCalculatorSchema);
