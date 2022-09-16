export const DomUtils = {
  /*
   * Add a list of elements to the current document
   * */
  addElementList(els: HTMLElement[], target?: HTMLElement, overlayOptions?: { id: string; className: string }) {
    const parent = document.createElement('div')
    if (overlayOptions?.id != null) {
      parent.id = overlayOptions?.id
    }
    if (overlayOptions?.className != null) {
      parent.className = overlayOptions?.className
    }

    els.map((el) => parent.appendChild(el))

    if (target) {
      target.appendChild(parent)
    } else {
      document.body.appendChild(parent)
    }

    return parent
  },

  /*
   * Remove an element from the current DOM tree
   * */
  removeElement(el: HTMLElement) {
    return el.parentNode?.removeChild(el)
  },

  removeElements(els: HTMLCollectionOf<Element>) {
    return Array.from(els).map((el) => el.parentNode?.removeChild(el))
  },
}
