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

  $('#foods').on('click', '.delete-button', function(){
    let foodId = this.parentElement.parentElement.id
    $(`#${foodId}`).remove()
    Food.deleteFood(foodId)
  })

  $('#foods').on('click', '#update', function(data){
    var html = $(this).html()
    var input = $(`<td><input type="text" value="${html}"/></td>`)
    $(this).replaceWith(input)
    let button = $('<button>Update</button>')

    $(input).siblings('.image').replaceWith(button)
    button.on('click', function(){
      let x = this.parentElement
      Food.updateFood(this.parentElement.id, input.value)


    })
    // data.currentTarget.replaceWith(input)
  })
})
