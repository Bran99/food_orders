var total = 0;
$('li').on('click', function () {
  console.log($(this).find('small'));
  var newOrderItem = $(this).clone();
  var priceAdd = parseInt($(this).find('small').text());
  total += priceAdd;
  console.log(priceAdd);
  $('#total').text('total: ' + total);
  $('.current-order').prepend(newOrderItem);
})
