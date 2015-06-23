var addRow = $('#addRow');
console.log(addRow);
$('#addRow').on('click', function () {
  console.log('made it here...');

  var newDiv = $('<div class="pure-control-group">'),
  newName = $('<input name="orders[name][]" type="text" placeholder="Name">'),
  newDesc = $('<input name="orders[description][]" type="text" placeholder="Description">'),
  newPrice = $('<input name="orders[price][]" type="number" placeholder="Price">'),
  newSelect = $('<select name="orders[type][]" class="type">')
  newAppetizer= $('<option value="Appetizer">').text('Appetizer'),
  newEntree = $('<option value="Entree">').text('Entree'),
  newDessert = $('<option value="Dessert">').text('Dessert'),
  newOther = $('<option value="Other">').text('Other');

  newSelect.append(newAppetizer)
           .append(newEntree)
           .append(newDessert)
           .append(newOther);

  newDiv.append(newName)
        .append(newDesc)
        .append(newPrice)
        .append(newSelect);

  $('ul').append($('<li>').append(newDiv));
});
