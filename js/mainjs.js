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
  if ( $(window).width() < 1024 ) {
    closeMenu();
  }
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

function selectType(){
  var type = $('#type').find(":selected").val();
  var topic = $('#topic').find(":selected").val();
  if (topic === "allTopics") {
    $('.allTypes').show();
    $('.allTypes:not(.' + type).hide()
  }
  if (topic !== "allTopics") {
    $('.allTopics').show();
    $('.allTopics:not(.' + topic).hide()
    $('.' + topic + ':not(.' + type).hide();
  }
}

function selectTopic(){
  var type = $('#type').find(":selected").val();
  var topic = $('#topic').find(":selected").val();
  if (type === "allTypes") {
    $('.allTopics').show();
    $('.allTopics:not(.' + topic).hide()
  }
  if (type !== "allTypes") {
    $('.allTypes').show();
    $('.allTypes:not(.' + type).hide()
    $('.' + type + ':not(.' + topic).hide();
  }
}
