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
    if (!newFood.name && !newFood.calories) {
      $('.error').remove()
      $('#food-form').after('<span class="error">Please enter a food name and calories amount</span>')
    }
    else if (!newFood.name) {
      $('.error').remove()
      $('#food-form').after('<span class="error">Please enter a food name</span>')
    }
    else if (!newFood.calories) {
      $('.error').remove()
      $('#food-form').after('<span class="error">Please enter a calorie amount</span>')
    }
    if (newFood.name && newFood.calories) {
      newFood.createFood()
      .then(function(food) {
        $('#title-row').after(food.toHTML())
      })
      $("#food-form")[0].reset()
        $('.error').remove()
    }
  })

  $('#foods').on('click', '.delete-button', function(){
    let foodId = this.offsetParent.offsetParent.id
    $(`#${foodId}`).remove()
    Food.deleteFood(foodId)
  })

  $('#food-input').on('keyup', function() {
    let input = this.value
    let filter = input.toUpperCase()
    let foods = document.getElementsByClassName('food')

    for(i = 0; i < foods.length; i++) {
      foodName = foods[i].children[0].innerHTML
        if (foodName.toUpperCase().indexOf(filter) > -1) {
            foods[i].style.display = ""
        } else {
            foods[i].style.display = "none"
        }
    }
  })
})
