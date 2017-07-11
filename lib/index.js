const Food = require('./food')
const $ = require('jquery')

function getFoodFromForm() {
  var name = $("input[placeholder='Food Name']").val()
  var calories = $("input[placeholder='Calories']").val()

  return new Food ({
    name: name,
    calories: calories
  })
}

$(function() {
  Food.allFoodsToHTML()
  .then(function(foodsHTML) {
    $('#foods').append(foodsHTML)
  });

  $('input[type=submit]').on('click', function(event){
    event.preventDefault();

    var newFood = getFoodFromForm()
    newFood.createFood()
    .then(function(fullEntry) {
      $('#title-row').after(fullEntry.toHTML())
    })
    $("#food-form")[0].reset()
  })
})
