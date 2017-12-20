export default {
  asideToggle (state) {
    state.asideShow = !state.asideShow
  },
  setUrl (state, location) {
    state.url = location
  }
}
