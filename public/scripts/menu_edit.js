var addRow = $('#addRow');
var index = 1;
console.log(addRow);
$('#addRow').on('click', function () {
  event.preventDefault();
  console.log('made it here...');

  var newDiv = $('<div class="pure-control-group">'),
      newName = $('<input name="menu[' + index + '][name]" type="text" placeholder="Name">'),
      newDesc = $('<input name="menu[' + index + '][description]" type="text" placeholder="Description">'),
      newPrice = $('<input name="menu[' + index + '][price]" type="number" placeholder="Price">'),
      newSelect = $('<select name="menu[' + index + '][type]" class="type">')
      newAppetizer= $('<option value="Appetizer">').text('Appetizer'),
      newEntree = $('<option value="Entree">').text('Entree'),
      newDessert = $('<option value="Dessert">').text('Dessert'),
      newOther = $('<option value="Other">').text('Other');

  newDiv.append(newName)
        .append(newDesc)
        .append(newPrice)
        .append(newSelect);

  newSelect.append(newAppetizer)
           .append(newEntree)
           .append(newDessert)
           .append(newOther);

  $('ul').append($('<li>').append(newDiv));
  index++;
});
