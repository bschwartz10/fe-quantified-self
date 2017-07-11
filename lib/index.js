const Food = require('./food')
const $ = require('jquery')

function getFoodFromForm() {
  var name = $("#name-field").val()
  var calories = $("#calories-field").val()

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

  $('#submit-food').on('click', function(event){
    event.preventDefault();

    var newFood = getFoodFromForm()
    if (newFood.name == "") {
      alert("No name")
    }
    newFood.createFood()
    .then(function(food) {
      $('#title-row').after(food.toHTML())
    })
    $("#food-form")[0].reset()
  })
})
