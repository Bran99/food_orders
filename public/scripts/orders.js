var total = 0;
$('li').on('click', function () {
  console.log($('this small'));
  var newOrderItem = $(this).clone();
  var priceAdd = parseInt($('this small').html());
  total += priceAdd;
  console.log(priceAdd);
  $('#total').text('total: ' + total);
  $('.current-order').prepend(newOrderItem);
})
