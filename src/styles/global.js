// GLOBAL JS for effects needed across site
// (JS for any page-specific effects in components).

// MAIN NAV MENU TOGGLE
const nav = () => {
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
    menu?.classList.toggle("flex");
    document.getElementById("open-btn")?.classList.toggle("hidden");
    document.getElementById("close-btn")?.classList.toggle("hidden");
    document.getElementById("misc")?.classList.toggle("hidden");
    document.getElementById("misc")?.classList.toggle("flex");
  }

  const initButtons = () => {
    document.getElementById("open-btn")?.addEventListener("click", toggleMenu);
    document.getElementById("close-btn")?.addEventListener("click", toggleMenu);
  }

  initButtons();
}

// DARKMODE
const dark = () => {
  const check = () => {
    const t = document.getElementsByTagName("html")[0];
    if (
      sessionStorage.theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      t?.classList.add("dark");
    } else {
      t?.classList.remove("dark");
    }
  }

  const toggly = () => {
    const t = document.getElementsByTagName("html")[0];
    t?.classList.toggle("dark");
    sessionStorage.theme = t?.classList.contains("dark") ? "dark" : "light";
  }

  const btns = () => {
    document.getElementById("darkie")?.addEventListener("click", toggly);
    check()
  }

  btns();
  check()
}


// SCROLL EFFECTS
const intersector = () => {
  const watch = () => {
    // Tight margin to avoid premature triggering
    const options = {
      rootMargin: "1%"
    };

    // Callback function
    // What a mess!
    const observer = new IntersectionObserver(
      (tt) => {
        tt.forEach((t, i) => {
          setTimeout(() => {
            if (t.isIntersecting) {
              if (t.target.classList.contains('special')) {
                t.target.classList.add("triggerSpecial");
              } else {
                t.target.classList.add("triggerMain");
              }
              observer.unobserve(t.target)
            }
          }, 100 * i);
        });
      },
      options
    );

    // Get list of possible intersections
    const tt = document.querySelectorAll(".intersect, article.post > *");

    // Observe possible intersections
    tt.forEach((t) => observer.observe(t));
  }

  // Trigger watch on first render
  watch()
}

// GLITCH EFFECT
const glitch = () => {
  let original = document.getElementById("glitch").textContent;
  let out = false
  let c = 0

  // Function to write stuff
  const write = async () => {
    let t = document.getElementById("glitch");
    let str = t.textContent

    // Garble string a little
    let chars = { "letters": "eiou", "symbols": "3!0/" }
    if (out !== true) {

      // Replace random character
      let r = Math.floor(Math.random() * chars["letters"].length)
      str = str.replace(chars["letters"][r], chars["symbols"][r])
      t.textContent = str

      // Check if there are more letters to replace, change branch if not
      var interection = (str.match(new RegExp('[' + chars["letters"] + ']', 'g')) || []).join('');
      if (interection.length == 0) out = !out

    } else if (out === true) {

      // Replace random character
      let r = Math.floor(Math.random() * chars["letters"].length)
      str = str.replace(chars["symbols"][r], chars["letters"][r])
      t.textContent = str

      // Check if there are more letters to replace, change branch if not
      var interection = (str.match(new RegExp('[' + chars["symbols"] + ']', 'g')) || []).join('');
      if (interection.length == 0) out = !out
    }
  }

  const caller = () => {
    let lim = original.length * (original.toLowerCase() == "welcome" ? 20 : 6)
    if (c < lim) {
      setTimeout(() => {
        write()
      }, Math.floor(Math.random() * 5000));
      c++
    }
  }

  setInterval(caller, 100)
}


// TYPEWRITER EFFECT
const typewriter = () => {

  const tt = document.querySelectorAll(".typewriter");

  if (tt.length != 0) {
    const write = (t, str) => {
      let j = 0
      const effect = () => {
        if (j < str.length + 1) {
          const render = str.slice(0, j)
          t.textContent = render + "_"
          j++
          setTimeout(effect, 150)
        } else {
          t.textContent = str
          j++
        }
      }
      effect()
    }

    const normal = () => {
      let strs = []
      tt.forEach((t) => {
        strs.push(t.textContent)
        t.textContent = "."
        t.classList.remove("hidden");
        for (let i = 0; i < tt.length; i++) {
          setTimeout(() => {
            write(tt[i], strs[i])
          }, 1000 * i);
        }
      })
    }

    const homepage = () => {
      setTimeout(() => {
        let hello = ["Bienvenido", "Tervetuloa", "Welcome"]
        for (let i = 0; i < hello.length; i++) {
          setTimeout(() => {
            write(tt[0], hello[i])
          }, 7000 * i);
        }
      }, 2000);
    }

    normal()
    homepage()
  }

}


// Function triggers
nav()
dark()
intersector()
glitch()
typewriter()

// Restart stuff after any Astro's view transitions' swap
document.addEventListener('astro:after-swap', nav)
document.addEventListener('astro:after-swap', dark)
document.addEventListener('astro:after-swap', intersector)
document.addEventListener('astro:after-swap', glitch)
document.addEventListener('astro:after-swap', typewriter)



