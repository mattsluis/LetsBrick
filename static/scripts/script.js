//coverflow
$(function() {
  $('.coverflow').coverflow();
});
//+collection
$('#collection-btn').click(function(e) {
  var addCollection = {
    title: $('#title').text(),
    year: $('#year').text(),
    set_id: $('#set_id').text(),
    imglink: $('#legoimg').attr("src"),
    count: $('#count').text()
  }
  console.log(addCollection);

  $.ajax({
    url: '/collection',
    method: 'POST',
    data: addCollection,
    success: function() {
      window.location = '/collection';
    }
  })
});

$('.delete-btn').click(function(e) {
  console.log($(this).attr('removeId'));
  var element = $(this);
  var delCollection = {
    id: $(this).attr('removeId')
  }
  console.log(delCollection);

  var onDone = function() {
    console.log('deleted', delCollection, element);
    window.location = window.location.pathname;
  };

  $.ajax({
    url: '/collection/',
    method: 'DELETE',
    data: delCollection,
  }).done(onDone);
});
//count
var sum = 0;
$('.hiddenCount').each(function(){
  sum += parseFloat($(this).text());
  console.log(sum);
  $('.totalCount').html(sum);
});
var numItems = $('.hiddenCount').length;
console.log(numItems);
$('.setCount').html(numItems);

$('#next-page').click(function(e){
  console.log('click');
});
