// Dependencies

var jwt    = require('jsonwebtoken');
var express = require('express');
var config = require('../server/config');


// Verify if token is valid
module.exports=function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        return res.status(403).json({ message: 'Failed to verify token or token not provided.[1x001]' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).json({ message: 'Failed to verify token or token not provided.[1x011]' });
    
  }
}