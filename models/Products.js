var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  orders: {type: Number, default: 0},
  image: String
});

ProductSchema.methods.purchase = function(cb) {
  this.orders += 1;
  this.save(cb);
};

mongoose.model('Product', ProductSchema);
