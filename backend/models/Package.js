const mongoose = require('mongoose');
const { isEmail } = require('validator');

const packageSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: [true, 'Please enter customer name']     
        
      },   
    recipient: {
        type: String,
        required: [true, 'Please enter recipient name']       
        
      },
      sender: {
        type: String,
        required: [true, 'Please enter sender address'],       
    
      },

    receiver: {
        type: String,
        required: [true, 'Please enter receiver address']       
        
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