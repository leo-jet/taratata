import Vue from 'vue'
import Vuex from 'vuex'
import VueQuillEditor from 'vue-quill-editor'
import CKeditor from '@ckeditor/ckeditor5-vue'
import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax)
Vue.use( CKeditor );
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import example from './module-example'
import utilisateur from './utilisateur'
import classe from './classe'
import question from './question'
import quiz from './quiz'
import cours from './cours'
import layoutDemo from './layoutDemo'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
Vue.use(VueQuillEditor, /* { default global options } */)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ( /* { ssrContext } */ ) {
  const Store = new Vuex.Store({
    modules: {
      example,
      utilisateur,
      classe,
      question,
      quiz,
      cours,
      layoutDemo
    }
  })

  return Store
}
