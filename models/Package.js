const mongoose = require('mongoose');
const { isEmail } = require('validator');

const packageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true, 'Please enter sender address'],       
        lowercase: true
      },

    receiver: {
        type: String,
        required: [true, 'Please enter receiver address'],       
        lowercase: true
      },
    
    weight:{
        type: String,
        required: [true, 'Please enter weight']
    },

    price:{
        type: String,
        required: [true, 'Please enter price']
    }, 
    created_at: {type: Date, default: Date.now}
  });








const Package = mongoose.model('package', packageSchema);

module.exports = Package;