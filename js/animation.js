function onMouseMove(event) {
  x = event.clientX
  y = event.clientY
  console.log(x, y)
  $(".bgDeep").css({ "background": 'radial-gradient(at ' + x + 'px ' + y + 'px, ' + '#e7b1f1 0, mistyrose 60%)' })
}
document.addEventListener("mousemove", onMouseMove);