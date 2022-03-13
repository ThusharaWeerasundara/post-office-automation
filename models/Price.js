const mongoose = require('mongoose');


const priceSchema = new mongoose.Schema({
    max: {
        type: String,
        required: [true, 'Please enter max. weight'],       
        lowercase: true
      },

    price: {
        type: String,
        required: [true, 'Please enter price'],       
        lowercase: true
      }
  });

 


const Price = mongoose.model('price', priceSchema);

module.exports = Price;





