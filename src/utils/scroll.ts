export const scrollLeft = () => {
  window.scroll(window.scrollX - 100, window.scrollY)
}

export const scrollRight = () => {
  window.scroll(window.scrollX + 100, window.scrollY)
}

export const scrollDown = () => {
  window.scroll(window.scrollX, window.scrollY + 100)
}

export const scrollUp = () => {
  window.scroll(window.scrollX, window.scrollY - 100)
}
