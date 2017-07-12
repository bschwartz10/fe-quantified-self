const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

function Diary(diary) {
  this.id = diary.id
  this.name = diary.name
}

Diary.getAllDiaryFoods = function(id) {
  return $.getJSON(`${host}/api/v1/diary/${id}`)
}

Diary.allFoodsToHTML = function(id) {
  let name = this.name
  return this.getAllDiaryFoods(id)
  .then(function(foods){
    return foods.map(function(food){
      return new Food(food);
    })
  })
  .then(function(foods) {
    return foods.map(function(food) {
      return food.toHTML(name);
    }).reverse()
  })
}

Diary.totalsRows = function() {
  return `<tr class="gray">
        <td>Total Calories</td>
        <td class="total-calo"></td>
      </tr>
      <tr>
        <td>Remaining Calories</td>
        <td class="rem-calo"></td>
      </tr>`
}

module.exports = Diary
