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
    if (out !== true) {
      str.includes('e')
        ? str = str.replace('e', '3')
        : str.includes('i')
          ? str = str.replace('i', '!')
          : str.includes('o')
            ? str = str.replace('o', '&')
            : out = true
      t.textContent = str
    } else if (out === true) {
      str.includes('!')
        ? str = str.replace('!', 'i')
        : str.includes('3')
          ? str = str.replace('3', 'e')
          : str.includes('&')
            ? str = str.replace('&', 'o')
            : str.includes("*")
              ? str = str.replace('*', '')
              : out = false
      t.textContent = str
    }
  }

  const caller = () => {
    if (c < original.length * 6) {
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

  const type = () => {
    for (let j = 0; j < tt.length; j++) {
      let t = tt[j]
      setTimeout(() => {
        let str = t.textContent
        t.textContent = "_"
        t.classList.remove("hidden");
  
        setTimeout(() => {
          let i = 0
          const effect = () => {
  
            if (i < str.length + 1) {
              const render = str.slice(0, i)
              t.textContent = render + "_"
              i++
              setTimeout(effect, 150)
            } else {
              t.textContent = str
              i++
            }
  
          }
          effect()
        }, "1000");
  
      }, 1000 * j);
    }
  }

  type()

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



