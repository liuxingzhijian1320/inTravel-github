// element-ui.js
import Vue from 'vue'
import { Button, Input, Message } from 'element-ui'

const components = [Button, Input, Message]

const Element = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}

Vue.use(Element)
