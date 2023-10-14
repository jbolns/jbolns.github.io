// MAIN JS FILE
// .................
// .................



// .................
// LOAD & RELOAD   :
// .................
// .................
// To avoid repainting everything every time a user clicks a link, this website does not have standard links
// Instead, links call a function that loads/reloads the main section only
// .......................................................................


// When user visits via address bar 
function loadReload() {
  // Get relative path
  console.log(location)
  let [folder, file] = $(location).attr('hash').split('/')
  console.log('load/reload of:', folder, file)

  // If home, load home, else load the appropriate section
  if (file) {
    folder = folder.substring(1)
    file = file.substring(1)
    $('#wrapper').load(folder + '/' + file + '.html')
  } else {
    $('#wrapper').load('pages/home.html')
  }

  // Get date for copyright notice
  getFecha()

  // Update main header
  typewriter(file)
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

  // Update main header
  typewriter(str)

}

// .................
// STYLING         :
// .................
// .................
// A lot of the styling is done via CSS
// Bits below give the last push
//.........................................

// Overlapping effect of <section> elements
function fixPos() {
  var minimised = []
  var maximised = []

  $('section').each(function (i) {
    if ($(this).hasClass('minimised')) {
      minimised.push(i)
    } else {
      maximised.push(i)
    }
  })

  // If not on mobile, fix positions as needed
  if ($(window).width() >= 768) {
    $('section').each(function (i, val) {
      // Get height of the previous section to avoid hiding section titles
      h = $(this).prev('section').outerHeight()
      if (i > 0) {
        if (h < 200) {
          $(this).css('marginTop', -h / 3)
        } else if (h < 400) {
          $(this).css('marginTop', -h / 5)
        } else {
          $(this).css('marginTop', -200)
        }
      }
    })

    $(`section:eq(${maximised[0]})`).css('margin', '0 auto')
  } else {
    $('section').each(function (i, val) {
      // Get height of the previous section to avoid hiding section titles
      $(this).css('marginLeft', 0)
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

    // Adjust BG colour & z-indexes (to avoid sections concealing other sections)
    const randy = Math.floor(Math.random() * palette.length)
    $(this).css({ 'z-index': zetaIndex, 'background': palette[randy] })
    zetaIndex += 1
  })

  // Adjust footer's z-index to ensure it falls on top
  $('footer').css('z-index', zetaIndex + 1)

  fixPos()
}

// .................
// BLOG MANAGEMENT
// .................
// .................
// Biggest drawback of vanilla JS is the blog index
// Pain in the neck to populate
// Currently using a JSON file for index
// JSON file IS (yes) re-generated automatically
// However, the re-generation is external to this site
// The bits below use the generated file.
// They do not generate it.
// ..................................................

// If on blog list, get filenames, headings, and intro for all blog entries
async function getFileNames(path) {
  path = path + '/blogindex.json'
  console.log('getting list of files from', path)

  // Call JSON file to get info
  const entries = await $.ajax(path)
    .done(function (response) {
      console.log('Call to blogindex.json successfull, response:', response)
      /*response.forEach(item => {
        filenames.push(item.filename)
        headlines.push(item.headline)
        intros.push(item.intro)
      })*/
    })
    .fail(function () { console.log('error with ajax call') })
    .always(function () { console.log('ajax call complete') })
  return entries
}

// After getting filenames for existing blogs, append each blog as <section> on <main>/#blogwrapper
async function loadBlogEntry(blog, n) {
  // Adjust blog info for final render
  const filename = blog.filename
  const title = `<h2><a href='#blog/#${filename}' class='blog' onclick='linky(this)'> ${blog.headline} </a></h2>`
  const intro = '<p>' + blog.intro + '</p>'
  const more = `<span class='more'><a href='#blog/#${filename}' class='blog' onclick='linky(this)'>Read more</a></span>`

  // Prefix for handling events and stuff
  const outer =
    `<section id='${filename}'>
  <span class='topper'>
  <p class='lefteao' onclick='maximise(this)'><span class='includer'></span></p>
  <p class='righteao'><span class='includer' onclick='minimise(this)'></span></p>
  </span>
  <div id='blog-${n}' class='internal'></div
  section>`

  $('#blogwrap').append(outer)

  // Render index entry
  // Note! Takes a bit to load. Function will finish before <sections> are painted to DOM
  selector = `#blog-${n}`
  $(selector).html(title +  intro + more)
}

// Main function to load blogs
async function blog() {
  console.log('host is', location.hostname) // I need this frequently because I get confused

  // Another forced ugly thing
  // Same reasons.
  // On localhost, AJAX is possible to directory
  // GitHub needs call to API (hopefully they won't block me, lmao)

  if (location.hostname === 'localhost') {
    var path = window.location.pathname + 'intros'
    //var blogPath = window.location.pathname + 'blog' // I might still revert to this, so gonna leave it here.
  } else {
    var path = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/intros?ref=main'
    //var blogPath = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/blog?ref=main' // I might still revert to this, so gonna leave it here.
  }

  // Call function to get filenames (which also has a localhost/GH conditional)
  const entries = await getFileNames(path)

  // Load each entry
  n = 1
  for (const blog of entries) {
    console.log('rendering...', blog)
    await loadBlogEntry(blog, n)
    n = n + 1
  }

// Check if blogs have finished painting to DOM, if not recall function after a few milliseconds
function check(max) {
  if ($('section').length === entries.length) {
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

// .................
// UX interactions :
// .................
// .................

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

  adjustio()
}

// Minimise sections to tabs after click
function minimise(element) {
  // Select current section
  var s = $(element).parent().parent().parent()
  $(s).addClass('minimised')

  // Save section indexes to arrays for minimised and maximised sections
  var minimised = []
  var maximised = []
  $('section').each(function (i) {
    if ($(this).hasClass('minimised')) {
      minimised.push(i)
    } else {
      maximised.push(i)
    }
  })

  // Adjust margin of section currently on top
  $(`section:eq(${maximised[0]})`).css('margin', '0 auto')

  // Adjust width of tabs
  const w = (80 / minimised.length)
  $.each(minimised, function (i, val) {
    $(`section:eq(${val})`).css({ 'margin-left': '1%', 'width': `${w}%` })
    $(`section:eq(${val})`).css('left', `${i * 1 + 1}%`)
  })

}

// Maximise tabs after click
function maximise(element) {
  var s = $(element).parent().parent()
  $(s).removeClass('minimised')
  $(s).css({ 'width': '100%', 'left': '0' })
  fixPos()
}

// Adjust z-indexes of all divs after maximising any tab
function adjustio() {
  console.log('adjust is running')
  // Save current z-indexes to array
  arr = []
  $('section').each(function () {
    arr.push($(this).css('z-index'))
  })

  // Get max z-index
  var z
  const base = z = Math.max(...arr)

  // Adjust z-index of minimised tabs
  $('section').each(function () {
    if ($(this).hasClass('minimised')) {
      $(this).css('z-index', z + 1)
      z += 1
    }
  })

  // Adjust footer's z-index
  $('footer').css('z-index', z + 1)
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
function typewriter(loc) {
  // Get current website section
  loc = loc === undefined ? 'home' : loc

  // Construct headline including name and website section
  var headline = 'dr.jose-a-bolanos > ' + loc

  // Function to type and function call
  var i = 0
  $('#typewriter').text('')
  function effect() {
    if (i < headline.length + 1) {
      const render = headline.slice(0, i)
      $('#typewriter').text(render)
      i++
      setTimeout(effect, 100)
    }
  }
  effect()
}

// ...................................................
// OLD APPROACH TO GETTING BLOG (PERSPECTIVES) INDEX :
// ...................................................
// It's a tad too slow for what I need
// However, I think there's something there.
// Leaving it here.
// For future reference.
// Idea was to avoid need for a JSON file by populating index directly from blog entries
// ...................................................

// async function getFileNames(path) {
//   //path = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/blog?ref=main'
//   // This function takes the path of a directory and returns an array with filenames in that directory
//   console.log('getting list of files from', path)
//   var filenames = []
//
//   // Call local directory if on localhost (returns text/html)
//   if (location.hostname === 'localhost') {
//     console.log('localhost detected --> extracting filenames from local directory')
//
//     await $.ajax(path)
//       .done(function (response) {
//
//         // Parse li elements from response
//         const parser = new DOMParser()
//         const html = parser.parseFromString(response, 'text/html').getElementsByTagName('a')
//         const liArray = [...html]
//
//         // Extract names names
//         liArray.forEach(li => filenames.push(li.innerHTML))
//       })
//       .fail(function () { console.log('error with ajax call') })
//       .always(function () { console.log('ajax call complete') })
//   } else {
//     console.log('online server detected --> extracting filenames from server')
//
//     await $.ajax(path)
//       .done(function (response) {
//         response.forEach(item => filenames.push(item.name))
//       })
//       .fail(function () { console.log('error with ajax call') })
//       .always(function () { console.log('ajax call complete') })
//   }
//
//   // Return the filenames
//   console.log('filenames extracted:', filenames)
//   return filenames
// }

// async function loadBlogEntry(filename, n) {
//   // Define path to find the blog entry
//   const target = window.location.pathname + 'intros/' + filename
//   console.log('function to load a single blog entry runs for target', target)
//
//   // Load and append blog entry
//   const href = filename.slice(0, -5)
//   console.log('href is', href)
//   const outer =
//     `<section id='${href}'>
//   <span class='topper'>
//   <p class='lefteao' onclick='maximise(this)'><span class='includer'></span></p>
//   <p class='righteao'><span class='includer' onclick='minimise(this)'></span></p>
//   </span>
//   <div id='blog-${n}' class='internal'></div
//   section>`
//
//   $('#blogwrap').append(outer)
//
//   // Call local directory if on localhost (returns text/html)
//   $.ajax(target)
//     .done(function (response) {
//       const parser = new DOMParser()
//       const parsed = parser.parseFromString(response, 'text/html')
//
//       const heading = parsed.getElementsByTagName('h2')[0].outerHTML
//
//       const paras = Array.from(parsed.getElementsByTagName('p'))
//       var intro = ''
//       paras.forEach(p => intro += p.outerHTML)
//
//       const more = `<span class='more'><a href='#blog/#${filename.slice(0, -5)}' class='blog' onclick='linky(this)'>Read more</a></span>`
//
//       selector = `#blog-${n}`
//       $(selector).html(heading + intro + more)
//     })
//     .fail(function () { console.log('error with ajax call') })
//     .always(function () { console.log('ajax call complete') })

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

