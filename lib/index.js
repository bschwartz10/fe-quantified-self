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
      $('.breakfast').append(foodsHTML).append(Diary.totalsRows(400))
    });
  Diary.allFoodsToHTML(2)
    .then(function(foodsHTML) {
      $('.lunch').append(foodsHTML).append(Diary.totalsRows(600))
    });
  Diary.allFoodsToHTML(3)
    .then(function(foodsHTML) {
      $('.dinner').append(foodsHTML).append(Diary.totalsRows(800))
    });
  Diary.allFoodsToHTML(4)
    .then(function(foodsHTML) {
      $('.snacks').append(foodsHTML).append(Diary.totalsRows(200))
    })
    .then(function() {
      let array = document.getElementsByClassName('calories')

      for (var i = 0; i < array.length; i++) {
        let tableId = array[i].parentElement.parentElement.parentElement
        let c = tableId.getElementsByClassName('total-calo')
        let d = tableId.getElementsByClassName('rem-calo')

        c[0].innerHTML = parseInt(c[0].innerHTML) + parseInt(array[i].innerHTML)
        d[0].innerHTML = parseInt(d[0].innerHTML) - parseInt(array[i].innerHTML)

        let colored = parseInt(d[0].innerHTML) < 0 ? "red" : "green"
        d[0].style.color = colored


      }
    })
    .then(function(){
      $('.total-cal-consumed').html((parseInt($('.lunch .total-calo').html()) +
      parseInt($('.breakfast .total-calo').html()) +
      parseInt($('.dinner .total-calo').html()) +
      parseInt($('.snacks .total-calo').html())))
      let remainingCals = $('.remaining-cal').html(parseInt($('.goal-cal').html()) - parseInt($('.total-cal-consumed').html()))
      let colors = remainingCals < 0 ? "red" : "green"
      remainingCals[0].style.color = colors

    })


  Food.allFoodsToHTML("food")
  .then(function(foodsHTML) {
    $('#foods').append(foodsHTML)
  });

  Food.allTheFoodsToHTML("food")
  .then(function(foodsHTML) {
    $('#foods2').append(foodsHTML)
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

setTimeout(function () {

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
}, 100);

  $('#food-input').on('keyup', filterFoods)

});
