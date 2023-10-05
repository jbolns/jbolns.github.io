// Main JS File
// ..

// Function to handle loading and reloading pages at the general level
function loadReload() {
  // Get relative path
  let str = $(location).attr('hash')
  str = str.substring(1)

  if (str === '') {
    $('#headlines').load('content/headlines.json.home')
  } else {
    $('#headlines').load('content/headlines.json.' + str)
  }

  if (str === '') {
    $('#wrapper').load('pages/home.html')
  } else {
    $('#wrapper').load('pages/' + str + '.html')
  }

  getFecha()
}

function linky(lnk) {
  var pos = lnk.lastIndexOf('#') + 1
  var str = lnk.substring(pos)
  $('#wrapper').load('pages/' + str + '.html')
  if ($(window).width() < 1024) {
    closeMenu()
  }
}

function getFecha() {
  var d = new Date()
  $('#fecha').text('2021-' + d.getFullYear())
}

function openMenu() {
  $('.open').css('display', 'none')
  $('.close').css({ 'display': 'inline-block', 'borderBottom': '0' })
  $('.wide').css('display', 'block')
  $('.socialMenu').css('display', 'none')
}

function closeMenu() {
  $('.open').css('display', 'inline-block')
  $('.close').css('display', 'none')
  $('.wide').css('display', 'none')
  $('.socialMenu').css('display', 'inline-block')
}

function iLikeYou() {
  alert('You rebel! I like you!')
  $('.greenButton').css('display', 'none')
}

function alternatives(len) {
  $('.short, .medium, .long').hide()
  $('.' + len).show(300)
  fixPos()
}

function fixPos() {
  console.log('fixpos is running')
  var c = 1
  $('section').each(function () {
    if (c % 3 === 0) {
      console.log(c)
      h = $(this).prev('section').outerHeight()
      if (h < 200) {
        $(this).css('marginTop', -h)
      } else if (h < 400) {
        console.log('here')
        $(this).css('marginTop', -h / 4)
      } else {
        $(this).css('marginTop', -200)
      }
    }
    c = c + 1
  })
}

function populateSections() {
  var c = 0
  const palette = ['white', 'white', 'white', 'white', 'aquamarine', 'mediumaquamarine', 'bisque', 'lightblue', 'lightcoral', 'lightgoldenrodyellow', 'lightpink', 'lightskyblue', 'moccasin', 'paleturquoise', 'palevioletred', 'peachpuff', 'pink', 'plum', 'powderblue', 'sandybrown', 'skyblue']
  $('section').each(function () {
    console.log('introducing event calls to sections')
    $(this).attr('onclick', 'emerge(this)')

    console.log("adjusting section's bg colours")
    const randy = Math.floor(Math.random() * palette.length)
    $(this).css({ 'z-index': c, 'background': palette[randy] })
    c = c + 1
  })
  $('footer').css('z-index', c + 2)
  fixPos()
}

function emerge(section) {
  var list = []
  $('section').each(function () {
    list.push(parseInt($(this).css('z-index')))
  })
  var max = Math.max(...list)
  console.log(max)
  $(section).css('z-index', max + 1)
  $('footer').css('z-index', max + 2)
}

function selectType() {
  var type = $('#type').find(':selected').val()
  var topic = $('#topic').find(':selected').val()
  if (topic === 'allTopics') {
    $('.allTypes').show()
    $('.allTypes:not(.' + type).hide()
  }
  if (topic !== 'allTopics') {
    $('.allTopics').show()
    $('.allTopics:not(.' + topic).hide()
    $('.' + topic + ':not(.' + type).hide()
  }
}

function selectTopic() {
  var type = $('#type').find(':selected').val()
  var topic = $('#topic').find(':selected').val()
  if (type === 'allTypes') {
    $('.allTopics').show()
    $('.allTopics:not(.' + topic).hide()
  }
  if (type !== 'allTypes') {
    $('.allTypes').show()
    $('.allTypes:not(.' + type).hide()
    $('.' + type + ':not(.' + topic).hide()
  }
}

function getFileNames(path) {
  // This function takes the path of a directory and returns an array with filenames in that directory
  var filenames = []

  var xhttp = new XMLHttpRequest()
  xhttp.open('GET', path, false)
  xhttp.send()

  if (location.hostname === 'azucar') {
    const response = xhttp.responseText
    console.log('response from call to directory', response)
    const parser = new DOMParser()
    const html = parser.parseFromString(response, 'text/html').getElementsByTagName('a')
    console.log('response from element selection', html)
    const liArray = [...html]

    liArray.forEach(li => filenames.push(li.innerHTML))
    console.log('filenames extracted from directory', filenames)
  } else {
    const response = JSON.parse(xhttp.responseText)
    console.log('response from call to directory', response)
    response.forEach(item => filenames.push(item.name))
    console.log('filenames extracted from directory', filenames)
  }
  return filenames
}

async function loadBlogEntry(filename) {
  // This function takes the path of a single blog and appends content to entries on blog page
  const target = window.location.pathname + 'blog/' + filename
  console.log('function to load a single blog entry runs for target', target)
  $('#blogwrap').append($('<section>').load(target))
  console.log('blog has been called, but it needs to be painted to DOM')
}

async function blog() {
  // This function calls for
  // - a function to get the filenames for all blogs in blog directory
  // - a function to load each blog on blog page

  console.log('host is', location.hostname)

  if (location.hostname === 'azucar') {
    var blogPath = window.location.pathname + 'blog'
    console.log('main blog function running.', 'blog directory is:', blogPath)
  } else {
    var blogPath = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/blog?ref=main'
    console.log('main blog function running.', 'blog directory is:', blogPath)
  }
  const filenames = getFileNames(blogPath)

  for (const filename of filenames) {
    await loadBlogEntry(filename)
  }

  console.log('number of blogs being painted', filenames.length)
  function check(max) {
    if ($('section').length === filenames.length) {
      console.log('all blogs have loaded')
      console.log('adjusting visuals')
      populateSections()
    } else {
      if (max > 0) {
        console.log('blogs still being painted to DOM. waiting a few milliseconds to adjust visuals')
        setTimeout(function () {
          check(max)
        }, 10)
      }
    }
  }
  var max = 100
  check(max)
}