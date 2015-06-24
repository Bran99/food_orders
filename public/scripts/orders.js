var total = 0;
var orderCount = 0;
var $orderForm = $('.current-order');

$('label').on('click', function () {
  var $input = $('#' + $(this).attr('for'));
  console.log($input);

  var attrs = ["name", "type", "description", "price"];

  attrs.forEach(function (att, i) {
    var $newInput = $("<input type='hidden'>");
    $newInput.attr("name", "orders[" + orderCount + "][" + att + "]");
    $newInput.attr("value", $input.data(att));

    $orderForm.prepend($newInput);
  });

  orderCount++;

  console.log($(this).find('small'));
  var newOrderItem = $(this).clone();
  newOrderItem.prepend($('<br/>'))
  var priceAdd = parseInt($(this).find('small').html());
  total += priceAdd;
  console.log(priceAdd);
  $('#total').attr('value', total);
  $('#totalHere').text(total);
  $('.current-order').prepend(newOrderItem);
});
