var express = require('express');

/* Controller for Home Page */
module.exports.index = function(req, res) {
  res.render('index', { title: 'Travlr Getaways' });
};
