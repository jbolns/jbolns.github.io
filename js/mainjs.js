// Main JS File
function loadReload(){
  var str = $(location).attr('hash');
  str = str.substring(1);
  if ( str === "") {
    $('#wrapper').load('includes/home.html');
  } else {
    $('#wrapper').load('includes/' + str + '.html');
  };
}

function linky(lnk){
  var pos = lnk.lastIndexOf("#") + 1;
  var str = lnk.substring(pos);
  $('#wrapper').load('includes/' + str + '.html');
}

function cR(){
  var d = new Date();
  $('#copyR').html(d.getFullYear());
}

function openMenu(){
  $('.open').css('display', 'none');
  $('.close').css({'display':'inline-block', 'borderBottom':'0'});
  $('.wide').css('display','block');
  $('.socialMenu').css('display','none');
}

function closeMenu(){
  $('.open').css('display', 'inline-block');
  $('.close').css('display', 'none');
  $('.wide').css('display', 'none');
  $('.socialMenu').css('display','inline-block');
}

function iLikeYou(){
  alert ("You rebel! I like you!");
  $('.greenButton').css('display', 'none');
}
