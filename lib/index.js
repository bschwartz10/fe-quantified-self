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
    let html = $(this).html()
    let input = $(`<input class="updater${this.parentElement.id}" type="text" value="${html}"/>`)
    let siblingHTML = $(this).siblings(`.updater${this.parentElement.id}`)
    $(this).replaceWith(input)
    let button = $('<button>Update</button>')

    $(input).siblings('.image').replaceWith(button)
    button.on('click', function(){
      let parentId = this.parentElement.id
      let values = $(`.updater${parentId}`).map(function(){return $(this).val()}).get()

      $(this).replaceWith($(`<td class='image'><input class="delete-button" type="image" src="./public/delete_button.png" /></td>`))
      values[0] == "" ? (values[0] = siblingHTML[0].innerHTML) : (values)
      values[1] == "" ? (values[1] = siblingHTML[0].innerHTML) : (values)
      let parentArray = Array.from($(`.food#${parentId}`).children(0))
      let first = parentArray[0].value ? parentArray[0].value : parentArray[0].innerHTML
      let last = parentArray[1].value ? parentArray[1].value : parentArray[1].innerHTML

      $(parentArray[0]).replaceWith(`<td class="updater${parentId}" id='update'>${first}</td>`)
      $(parentArray[1]).replaceWith(`<td class="updater${parentId}" id='update'>${last}</td>`)
      // $(input).replaceWith(`<td class="updater${parentId}" id='update'>${}</td>`)
      $(siblingHTML).replaceWith(`<td class="updater${parentId}" id='update'>${siblingHTML[0].innerHTML}</td>`)
      Food.updateFood(parentId, values[0], values[1])
    })
    // data.currentTarget.replaceWith(input)
  })
})
