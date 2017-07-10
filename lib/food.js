const $ = require('jquery')
const host = require('./config').host

export default class Food {
  constructor(food) {
    this.id = food.id
    this.name = food.name
    this.calories = food.calories
    this.created_at = food.created_at
  }

  getAllFood () {
    return $.getJSON(`${host}/api/v1/foods`)
  }

  toHTML () {
    return `<tr class="food" data-id=${this.id}>
              <td>Name: ${this.name}</td>
              <td>Calories: ${this.calories}</td>
              <td><button class="btn btn-danger">Delete</button></td>
            </tr>`
  }

  allFoodToHTML (foods) {
    const table = $('food_table')
    foods.forEach(function(food){
      const row = document.createElement('tr')
      $(row).addclass(`food-${food.id}`)
      $(row).append()
      $(row).append(`<td>${food.calories}</td>`)
      $(row).append(`<td><button class="btn btn-danger">Delete</button></td>`)
      table.append(row)
    })
  }
}
