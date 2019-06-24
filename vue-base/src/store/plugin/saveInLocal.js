export default store => {
  // 持久化存储
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutations, state) => {
    localStorage.state = JSON.stringify(state)
  })
}