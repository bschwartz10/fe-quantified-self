const Food = require('./food')
const Diary = require('./diary')
const $ = require('jquery')

function getFoodFromForm() {
  var name = $("#name-field").val()
  var calories = $("#calories-field").val()

  return new Food ({
    name: name,
    calories: calories
  })
}

function filterFoods() {
  const filter = this.value.toUpperCase()
  const foods = document.getElementsByClassName('food')

  for(i = 0; i < foods.length; i++) {
    const foodName = foods[i].children[0].innerHTML
    const match = foodName.toUpperCase().indexOf(filter) > -1
    foods[i].style.display = match ?  "" : "none"
  }
}

$(function() {
  Diary.allFoodsToHTML(1)
    .then(function(foodsHTML) {
      $('.breakfast').append(foodsHTML).append(Diary.totalsRows())
    });
  Diary.allFoodsToHTML(2)
    .then(function(foodsHTML) {
      $('.lunch').append(foodsHTML).append(Diary.totalsRows())
    });
  Diary.allFoodsToHTML(3)
    .then(function(foodsHTML) {
      $('.dinner').append(foodsHTML).append(Diary.totalsRows())
    });
  Diary.allFoodsToHTML(4)
    .then(function(foodsHTML) {
      $('.snacks').append(foodsHTML).append(Diary.totalsRows())
    });

  Food.allFoodsToHTML("food")
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
        $('#title-row').after(food.toHTML("food"))
      })
      $("#food-form")[0].reset()
        $('.error').remove()
    }
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
    let button = $('<button>Update</button>')

    $(this).replaceWith(input)
    $(input).siblings('.image').replaceWith(button)

    button.on('click', function(){
      let parentId = this.parentElement.id
      let values = $(`.updater${parentId}`).map(function(){return $(this).val()}).get()

      $(this).replaceWith($(`<td class='image'><input class="delete-button" type="image" src="./public/delete_button.png" /></td>`))
      console.log(values);
      values[0] == "" ? (values[0] = siblingHTML[0].innerHTML) : (values)
      values[1] == "" ? (values[1] = siblingHTML[0].innerHTML) : (values)

      let parentArray = Array.from($(`.food#${parentId}`).children(0))
      let name = parentArray[0].value ? parentArray[0].value : parentArray[0].innerHTML
      let calories = parentArray[1].value ? parentArray[1].value : parentArray[1].innerHTML

      $(parentArray[0]).replaceWith(`<td class="updater${parentId}" id='update'>${name}</td>`)
      $(parentArray[1]).replaceWith(`<td class="updater${parentId}" id='update'>${calories}</td>`)
      Food.updateFood(parentId, values[0], values[1])
    })
  })

  $('#food-input').on('keyup', filterFoods)


})
