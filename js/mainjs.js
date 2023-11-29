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
  let [folder, file] = $(location).attr('hash').split('/')
  console.log('load/reload of:', folder, file)

  toplinks()

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
  console.log(lnk)
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

// Main function to load links
async function getTopLinks(path) {
  path = path + '/nav1.json'

  // Call JSON file to get info
  const entries = await $.ajax(path)
    .done(function (response) {
      console.log('Call to nav1.json successfull, response:', response)
    })
    .fail(function () { console.log('error with ajax call') })

  return entries
}


async function toplinks() {
  var path = window.location.pathname + 'json'

  // Call function to get filenames (which also has a localhost/GH conditional)
  const entries = await getTopLinks(path)

  // Load each entry
  n = 1
  for (const link of entries) {
    await loadTopLinks(link, n)
    n = n + 1
  }
}

async function loadTopLinks(link) {
  // Adjust link info for final render
  const href = `<li class='wide'><a href='#pages/#${link.url}' class='pages' onclick='linky(this)'>${link.name}</a></li>`

  // Render links
  selector = `.topLinks`
  $(selector).append(href)
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
    $('section:not(invisible)').each(function (i, val) {
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
// Currently using a JSON file for index
// This JSON file IS generated automatically
// That said, the bits below make use of the generated file. They do not generate it.
// ..................................................

// If on blog list, get filenames, headings, and intro for all blog entries
async function getEntries(path) {
  path = path + '/blog1.json'

  // Call JSON file to get info
  const entries = await $.ajax(path)
    .done(function (response) {
      console.log('Call to blogs1.json successfull, response:', response)
    })
    .fail(function () { console.log('error with ajax call') })

  const sorted = entries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  return sorted
}

// After getting filenames for existing blogs, append each blog as <section> on <main>/#blogwrapper
async function loadBlogEntry(blog, n) {
  // Adjust blog info for final render
  const filename = blog.filename
  const cats = blog.categories
  const title = `<h2><a href='#blog/#${filename}' class='blog' onclick='linky(this)'> ${blog.headline} </a></h2>`
  const intro = '<p>' + blog.intro + '</p>'
  const more = `<span class='more'><a href='#blog/#${filename}' class='blog' onclick='linky(this)'>Read more</a></span>`

  // Prefix for handling events and stuff
  const outer =
    `<section id='${filename}' class='invisible all ${cats}'>
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
  $(selector).html(title + intro + more)
}

// Main function to load blogs
async function blog() {
  var path = window.location.pathname + 'json'

  // Call function to get filenames (which also has a localhost/GH conditional)
  const entries = await getEntries(path)

  // Load each entry & save categories to array
  n = 1
  let cats = 'all'
  for (const blog of entries) {
    await loadBlogEntry(blog, n)
    cats = cats + ' ' + blog.categories
    n = n + 1
  }
  const unique = [...new Set(cats.split(' '))]

  // Paint categories to category bar
  unique.forEach(cat => {
    cat = cat.trim()
    console.log(cat)
    const btn = `<button type="button" onclick="selectCat('${cat}')">${cat}</button>`
    
    $('#catbar').append(btn)
  })
 
  // xyz

  // Check if blogs have finished painting to DOM, if not recall function after a few milliseconds
  function check(max) {
    if ($('section').length === entries.length) {
      console.log('all blogs have loaded --> adjusting visuals')
      $('section.invisible').slice(0, 4).removeClass('invisible')
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

// BLOG
// Load more blogs
async function loadMoreBlogs() {
  let n = $('section.invisible').length
  if (n !== 0) {
    await $('section.invisible').slice(0, 4).removeClass('invisible')
  }

  n = $('section.invisible').length
  if (n === 0) {
    $('#loadBlogs').addClass('invisible')
  }
}

// Blog's category selection
function selectCat(cat) {
  $('section').css('marginBottom', -60)
  if (cat === 'all') {
    $('.all').show()
    $('.all:not(.' + cat).show()
  } else {
    $('.all').show()
    $('.all:not(.' + cat).hide()
  }
  let selector = 'section.' + cat
  $(selector).first().css('marginTop', 0)
  $(selector).last().css('marginBottom', 75)
  $('#loadBlogs').addClass('invisible')
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
  loc = loc === undefined ? 'home' : loc.replace('.html', '')

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