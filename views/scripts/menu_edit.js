var addRow = $('#addRow');
console.log(addRow);
$('#addRow').on('click', function () {
  console.log('made it here...');
  var lastDiv = $('div');
  console.log(lastDiv);

  var newDiv = $('<div>'),
  newName = $('<input name="orders[name][]" type="text" placeholder="Name">'),
  newDesc = $('<input name="orders[description][]" type="text" placeholder="Description">'),
  newPrice = $('<input name="orders[price][]" type="number" placeholder="Price">'),
  newSelect = $('<select name="orders[type][]" class="type">')
  newAppetizer= $('<option value="Appetizer">'),
  newEntree = $('<option value="Entree">'),
  newDessert = $('<option value="Dessert">'),
  newOther = $('<option value="Other">');

  newSelect.append(newAppetizer)
           .append(newEntree)
           .append(newDessert)
           .append(newjOther);

  newDiv.append(newName)
        .append(newDesc)
        .append(newPrice)
        .append(newSelect);

  lastDiv.append(newDiv);
});
