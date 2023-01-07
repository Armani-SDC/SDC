//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/fetcher2', {useCreateIndex: true, autoIndex: true,});

let productSchema = mongoose.Schema({

  id: {type: Number, unique: true}
  name: String,
  description: String,
  category: String,
  default_price: Number,
  feautures: Array
});

let Products = mongoose.model('Products', productSchema);

/////
let styleSchema = mongoose.Schema({

  style_id: {type: Number, unique: true}
  name: String,
  original_price: String,
  sale_price: String,
  is_default: Number,
  photos: Array,
  skus: Object
});

let Styles = mongoose.model('Styles', styleSchema);