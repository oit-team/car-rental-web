import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { TablePage } from '@oit/element-ui-extend'
import { fieldStorage } from '@/utils/fieldStorage'
import App from '@/App.vue'
import router from '@/router'
import '@/plugins/element-ui'

import '@/styles/index.scss'

import '@unocss/reset/tailwind.css'
import 'uno.css'

Vue.config.productionTip = false

Vue.use(TablePage, {
  async setFields(this: any, set: any) {
    const fieldKey = this.$attrs['field-key']
    const fields = (fieldKey && await fieldStorage.get(fieldKey)) || sessionStorage.getItem('headTitString')
    if (fields)
      set(JSON.parse(fields))
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
