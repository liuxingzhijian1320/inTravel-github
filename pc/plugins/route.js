export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    app.store.commit('user/checkUserInfo')
    next()
  })
}
