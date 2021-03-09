// Main JS File
function centrao(){
  var bodyHeight = $(window).height() - $('nav').height() - $('footer').height();
  var wrapperHeight = $('header').height() + $('main').height();
  var centrePage = (bodyHeight - wrapperHeight) / 2;
  $('#wrapper').css('marginTop', centrePage);
}

function cR(){
  var d = new Date();
  $('#copyR').html(d.getFullYear());
}
