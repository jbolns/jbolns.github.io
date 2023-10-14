// THIS FILES CONTAINS JS STUFF THAT I'M NOT CURRENTLY USING BUT ALSO DON'T WANT TO DELETE JUST YET

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

// & THE BIT OF CODE THAT WILL ADJUST CALLS ON MAIN FUNCTION IS
// if (location.hostname === 'localhost') {
//   var path = window.location.pathname + 'intros'
//   //var blogPath = window.location.pathname + 'blog' // I might still revert to this, so gonna leave it here.
// } else {
//   var path = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/intros?ref=main'
//   //var blogPath = 'https://api.github.com/repos/jbolns/jbolns.github.io/contents/blog?ref=main' // I might still revert to this, so gonna leave it here.
// }

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