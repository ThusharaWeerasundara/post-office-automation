const User = require("../models/User");
const Package = require("../models/Package");
const Price = require("../models/Price");
var crypto = require('crypto');
const jwt = require('jsonwebtoken');


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
    const user = await User.login(email, password);
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


module.exports.package_post = async (req, res) => {
  
  const { sender, receiver, weight } = req.body;
  var price = 0;

  Price.find({}).then(async results => {

    for (let i = 0; i < results.length; i++) 
    {
        if(weight <= results[i].max)
         {
           price = results[i].price;
           break;
        }
    }

    try
    { 
      const package = await Package.create({ sender, receiver, weight, price });
      res.status(201).json({ package: package });
    }
    catch(err)
    {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }

  })






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
