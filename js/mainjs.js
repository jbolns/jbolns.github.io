// MAIN JS FILE
// ..

// LOAD & RELOAD
// To avoid repainting the whole page every time a user clicks a link, this website does not have standard links
// Instead, links call a function that loads/reloads the main section only

// When user visits via address bar 
function loadReload() {
  // Get relative path
  console.log(location)
  let [folder, file] = $(location).attr('hash').split('/')
  console.log('load/reload of:', folder, file)

  // If home, load home, else load the appropriate section
  if (file) {
    console.log('reload', 'folder:', folder, 'file:', file)
    folder = folder.substring(1)
    file = file.substring(1)
    $('#wrapper').load(folder + '/' + file + '.html')
  } else {
    console.log('load', 'folder:', folder, 'file:', file)
    $('#wrapper').load('pages/home.html')
  }

  getFecha()
  typewriter()
}

// When user clicks a nav link
function linky(lnk) {
  console.log('linky is running with href', lnk.href, 'and link class', lnk.className)
  // Get address
  var pos = lnk.href.lastIndexOf('#') + 1
  var str = lnk.href.substring(pos)

  // Paint section
  $('#wrapper').html('<></>')
  $('#wrapper').load(lnk.className + '/' + str + '.html')

  // Collapse menu if on mobile
  if ($(window).width() < 1024) { closeMenu() }

}

// A lot of the styling is done via CSS, but this is needed to get the overlapping effect of <section> elements
function fixPos() {

  // If not on mobile, fix positions as needed
  if ($(window).width() >= 768) {
    // Loop through all sections in page
    var i = 1 // Index to keep count of section numbers
    $('section').each(function () {
      if (i % 3 === 0) {
        // Get height of the previous section to avoid hiding section titles
        h = $(this).prev('section').outerHeight()

        if (h < 200) {
          $(this).css('marginTop', -h)
        } else if (h < 400) {
          $(this).css('marginTop', -h / 4)
        } else {
          $(this).css('marginTop', -200)
        }
      }
      i = i + 1
    })
  }
}

// Add event handlers to <section> tags, and call for function to position them
function populateSections() {
  // Palette to pick colours from
  const palette = ['white', 'white', 'white', 'white', 'aquamarine', 'mediumaquamarine', 'bisque', 'lightblue', 'lightcoral', 'lightgoldenrodyellow', 'lightpink', 'lightskyblue', 'moccasin', 'paleturquoise', 'palevioletred', 'peachpuff', 'pink', 'plum', 'powderblue', 'sandybrown', 'skyblue']

  // Loop through all sections in page
  var zetaIndex = 0 // Index to give each section a z-index higher than previous, to avoid hidding section titles
  $('section').each(function () {
    // Introduce event calls
    $(this).attr('onclick', 'emerge(this)')

    // Adjust BG colour
    const randy = Math.floor(Math.random() * palette.length)
    $(this).css({ 'z-index': zetaIndex, 'background': palette[randy] })

    zetaIndex = zetaIndex + 1
  })
  $('footer').css('z-index', zetaIndex + 2)
  fixPos()
}

// If on blog list, get filenames of all blogs in blog directory
function getFileNames(path) {
  // This function takes the path of a directory and returns an array with filenames in that directory
  var filenames = []

  var xhttp = new XMLHttpRequest()
  xhttp.open('GET', path, false)
  xhttp.send()

  // Yuck, this is ugly but forced
  // On localhost, the ajax call renders HTML as text with a list of items in directory
  // GitHub (this site is hosted there) API gives JSON

  // If on localhost, parse HTML from text response
  if (location.hostname === 'localhost') {
    // Response as text
    const response = xhttp.responseText
    console.log('response from call to directory', response)

    // Parse it into HTML
    const parser = new DOMParser()
    const html = parser.parseFromString(response, 'text/html').getElementsByTagName('a')
    console.log('response from element selection', html)

    // Extract link elements
    const liArray = [...html]

    // Figure out the names
    liArray.forEach(li => filenames.push(li.innerHTML))
    console.log('filenames extracted from directory', filenames)

  } else {
    // Response as JSON
    const response = JSON.parse(xhttp.responseText)
    console.log('response from call to directory', response)

    // Figure out the names
    response.forEach(item => filenames.push(item.name))
    console.log('filenames extracted from directory', filenames)
  }

  // Return the filenames for use by other functions
  return filenames
}

// After getting filenames for existing blogs, append each blog as <section> on <main>/#blogwrapper
async function loadBlogEntry(filename, n) {
  // Define path to find the blog entry
  const target = window.location.pathname + 'blog/' + filename
  console.log('function to load a single blog entry runs for target', target)

  // Load and append blog entry
  const href = filename.slice(0, -5)
  console.log('href is', href)
  const outer =
    `<section id='${href}'>
  <span class='topper'>
    <p class='lefteao'><span class='includer'></span></p>
    <p class='righteao'><span class='includer'></span></p>
  </span>
  <div id='blog-${n}' class='internal'></div
  section>`

  $('#blogwrap').append(outer)

  // The internal section takes a while to load. Function will finish before <sections> are painted to DOM
  var xhttp = new XMLHttpRequest()
  xhttp.open('GET', target, false)
  xhttp.send()

  const response = xhttp.responseText

  const parser = new DOMParser()
  const parsed = parser.parseFromString(response, 'text/html')

  const heading = parsed.getElementsByTagName('h2')[0].outerHTML

  const paras = Array.from(parsed.getElementsByClassName('intro'))
  var intro = ''
  paras.forEach(p => intro += p.outerHTML)

  const more = `<span class='more'><a href='#blog/#${filename.slice(0, -5)}' class='blog' onclick='linky(this)'>Read more</a></span>`

  selector = `#blog-${n}`
  $(selector).html(heading + intro + more)
}

// Main function to load blogs
async function blog() {
  console.log('host is', location.hostname) // I need this frequently because I get confused

  // Another forced ugly thing
  // Same reasons.
  // On localhost, AJAX is possible to directory
  // GitHub needs call to API (hopefully they won't block me for this, lmao)

  if (location.hostname === 'localhost') {
    var blogPath = window.location.pathname + 'blog'
    console.log('main blog function running.', 'blog directory is:', blogPath)
  } else {
    var blogPath = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/blog?ref=main'
    console.log('main blog function running.', 'blog directory is:', blogPath)
  }

  // Call function to get filenames (which also has a localhost/GH conditional)
  const filenames = getFileNames(blogPath)

  // Get each file
  n = 1
  for (const filename of filenames) {
    await loadBlogEntry(filename, n)
    n = n + 1
  }

  // Check if blogs have finished painting to DOM, if not recall function after a few milliseconds
  function check(max) {
    if ($('section').length === filenames.length) {
      console.log('all blogs have loaded --> adjusting visuals')
      populateSections()
    } else {
      if (max >= 0) {
        console.log('blogs still being painted to DOM. waiting a few milliseconds to adjust visuals')
        setTimeout(function () {
          check(max)
        }, 10)
      }
    }
  }
  var max = 100 // Max number of times to run check. If they haven't loaded by then, there's a different problem
  check(max) // Call function to check if sections have painted
}

// NAVBAR 
// Open menu
function openMenu() {
  $('.open').css('display', 'none')
  $('.close').css({ 'display': 'inline-block', 'borderBottom': '0' })
  $('.wide').css('display', 'block')
  $('.socialMenu').css('display', 'none')
}

// Collapse menu
function closeMenu() {
  $('.open').css('display', 'inline-block')
  $('.close').css('display', 'none')
  $('.wide').css('display', 'none')
  $('.socialMenu').css('display', 'inline-block')
}


// UX interactions
// Make text shorter/longer as desired by user, possible in some sections

function alternatives(len) {
  $('#short, #medium, #long').removeClass('active')
  $('.short, .medium, .long').hide(200)
  $('#' + len).addClass('active')
  $('.' + len).show(300)
  


}

// Bring section to top
function emerge(section) {
  // Get max z-index of all sections in page
  var list = []
  $('section').each(function () {
    list.push(parseInt($(this).css('z-index')))
  })
  var max = Math.max(...list)

  // Change z-index of chosen section to max + 1
  $(section).css('z-index', max + 1)

  // Change <footer> z-index to max + 2 to avoid last section accidentally ending on top of footer
  $('footer').css('z-index', max + 2)
}

// MISCELLANOUS STUFF
// Date for copyright
function getFecha() {
  var d = new Date()
  $('#fecha').text('2021-' + d.getFullYear())
}

// I think this is funny
function iLikeYou() {
  alert('You rebel! I like you!')
  $('.greenButton').css('display', 'none')
}



// Typewrite effect for site main title
function typewriter() {
  var headline = 'dr.jose-a-bolanos'
  var i = 0
  $('#typewriter').text('')
  function effect() {
    if (i < headline.length + 1) {
      const render = headline.slice(0, i)
      $('#typewriter').text(render)
      i++
      setTimeout(effect, 200);
    }
  }
  effect()
}

/*function erase(headline, i) {
  if (i < headline.length + 1) {
    const render = headline.slice(0, headline.length - i)
    $('#typewriter').text(render)
    i++
    setTimeout(erase(headline, i), 50);
  }
}*/

// ..........................................
// MORE STUFF THAT I HAVEN'T QUITE FINISHED :
// ..........................................

// Category handlers for portfolio and publications
// They broke in last update and I'm waiting until I have more projects/publications to fix 
/*function selectType() {
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
}*/

