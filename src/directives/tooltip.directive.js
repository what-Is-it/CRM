export default {
  mounted: (el, {value}) => {
    window.M.Tooltip.init(el, {html: value, margin: 0})
  },
  unmounted: (el) => {
    const tooltip = window.M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  },
}
