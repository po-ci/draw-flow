const mongoose = require('mongoose');



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const TreeSchema = new Schema({

 name: {type: String, required: true, unique: false},
 json: {type: mongoose.Schema.Types.Mixed, ref: "", required: false, unique: false, index: false}


}, { minimize: false });




TreeSchema.plugin(mongoosePaginate);
TreeSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Tree = mongoose.model('Tree', TreeSchema);

module.exports = Tree;
