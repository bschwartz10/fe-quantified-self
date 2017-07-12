var $ = require('jquery');
var host = require('./config').host

function Food(food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

Food.prototype.toHTML = function() {
  return `<tr class="food" id=${this.id}>
            <td id='update'>${this.name}</td>
            <td id='update'>${this.calories}</td>
            <td class='image'><input class="delete-button" type="image" src="./public/delete_button.png" /></td>
          </tr>`
}

Food.allFoodsToHTML = function() {
  return this.getAllFoods()
  .then(function(foods){
    return foods.map(function(food){
      return new Food(food);
    })
  })
  .then(function(foods) {
    return foods.map(function(food) {
      return food.toHTML();
    }).reverse()
  })
}

Food.getAllFoods = function() {
  return $.getJSON(`${host}/api/v1/foods`)
}

Food.prototype.createFood = function() {
  return $.post(`${host}/api/v1/foods`,
    { name: this.name,
      calories: this.calories
    }
  )
  .then(function(foodObject) {
    return new Food(foodObject)
  })
}

Food.deleteFood = function(id) {
  $.ajax({url: `${host}/api/v1/foods/${id}`,
                   type: `DELETE`,
                   success: function(result){
                     return result
                   }})
}

Food.updateFood = function(id, name, calories) {
  $.ajax({url: `${host}/api/v1/foods/${id}`,
                type: `PUT`,
                body: {id: id,
                       name: name,
                       calories: calories},
                success: function(result){
                  return result
                }})
}
module.exports = Food
