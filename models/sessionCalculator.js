var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model of asession.
var SessionCalculatorSchema = Schema({
  numberSession : {
    type : Number,
    required : 'The number is required'},
  expression : {
    type : String,
    required : 'The expression is required' }
}, {
    versionKey: false 
});

module.exports = mongoose.model('SessionCalculator', SessionCalculatorSchema);
