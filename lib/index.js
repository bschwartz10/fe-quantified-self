const Food = require('./food')
const $ = require('jquery')

$(function() {
  Food.allFoodsToHTML()
  .then(function(foodsHTML) {
    $('.foods_table').append(foodsHTML)
  });
});
