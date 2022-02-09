export default async function (to, from, savedPosition) {
  console.log('to', to)
  console.log('from', from)
  console.log('savedPosition', savedPosition)

  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
