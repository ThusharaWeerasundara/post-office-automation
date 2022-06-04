const User = require("../models/User");
const Package = require("../models/Package");
const Price = require("../models/Price");
var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.hivemq.com')


// create json web token
const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  });
};

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already used by a registered user';
    return errors;
  }

  // validation errors
  if (err.message.toLowerCase().includes('validation failed')) {
   
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  
  return errors;
}


module.exports.get_packages = (req, res) => {

  Package.find({}, {_id:0, customer:1, recipient:1, sender:1, receiver:1, weight:1, price:1, created_at:1}).then(async results => {
        
        console.log("get packages")
      res.status(200).json({ packages: results });
  })
}

module.exports.readings_put = (req, res) => {
  const tank =  JSON.parse(req.params.id); 
  console.log(tank);
  const filter = {email: tank.email, no: tank.no};
  console.log((req.body) );
  Tank.updateOne(filter, req.body , function(err,
    result)
    {
      if (err) 
        {
          console.log(err);
          res.send({'response' : 400});
        } 
      else 
        { 
           console.log("result");
          res.send({'response' : 200});
        }
    });
}

module.exports.user_put = (req, res) => {


  
  const filter = { email : req.body.email};
  //const update = {firstname : req.body.firstname ,lastname: req.body.lastname, contact: req.body.contact, address: req.body.address};
  
  console.log(req.body)

try
{
  
  customer.updateOne(filter, req.body, { runValidators: true }, function(err,
    result)
    {
      if (err) 
        {
          const errors = handleErrors(err);
          console.log("errors: "+err)
          res.status(400).json({ 'error': errors });
        } 
        else 
        {
         if(result.nModified == 0 && result.n == 1) 
            {'Theese are Existing Values!'
              res.status(406).json({'msg' : 'Theese are Existing Values!'});
            }
         else if(result.nModified == 0 && result.n == 0)
            {
              res.status(404).json({'msg' : 'There are No Exsiting Customer Under this Email!'});
            }
            else
            {
              res.status(200).json({'msg' : 'Customer was Updated!'});
            }
          
        }
    });
}
catch (err)
{
  const errors = handleErrors(err);
    
  res.status(400).json({'error': errors });
}


}



module.exports.signup_post = async (req, res) => {

    console.log(req.body)
  const { email, password, role } = req.body;
  
  try 
  {
    const user = await User.create({ email, password, role });
    const token = createToken(user._id);
    console.log(user);
    res.status(201).json(user)
  }
  catch(err) 
  {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log("login request")
  try 
  {
    const user = await User.login(email, password)
    console.log(user);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({ user: user });
   } 
  catch (err) 
  {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.test_get = (req, res) => {
  res.status(200).json({ message: "get test works" });
}

module.exports.test_post = (req, res) => {
    console.log(req.body)
  res.status(200).json({ message: "post test works" });
}



module.exports.package_post = async (req, res) => {
  
  const {customer, recipient, sender, receiver, weight, price } = req.body;

try
    { 
      const package = await Package.create({customer, recipient, sender, receiver, weight, price });
      res.status(201).json({ package: package });
    }
    catch(err)
    {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }

}

module.exports.price_post = async (req, res) => {
  
  const { max, price } = req.body;
  //console.log(req.body)
  try
  { 
    const range = await Price.create({ max, price });
    res.status(201).json({ range: range });
  }
  catch(err)
  {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.price_put = async (req, res) => {
  
  const range =  JSON.parse(req.params.id);
  const filter = {max: range.max, price: range.price};
  
  Price.updateOne(filter, req.body , function(err,
    result)
    {
      if (err) 
        {
          console.log(err);
          res.send({'response' : 400});
        } 
      else 
        { 
           console.log("result");
          res.send({'response' : 200});
        }
    });
}


client.on('connect', function () {
  client.subscribe('yg', function (err) {
    if (!err) 
    {
      console.log("mqtt works in server")
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  var price = 0;

  var weight = message.toString();

    Price.find({}).then(async results => {
      //console.log("hereee")

    for (let i = 0; i < results.length; i++) 
    {
      //console.log(results[i])
        if(weight <= results[i].max)
         {
           price = results[i].price;
           console.log("price is: " + price);

  const filter = {weight: 0, price: 0};
  const updates = {weight: weight, price: price};

  Package.updateOne(filter, updates , function(err,
    result)
    {
      if (err) 
        {
          console.log(err);
        } 
      else 
        { 
           console.log("result");
        }
    });
           break;
        }
    }

    

  })

})