import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import VeeValidate from 'vee-validate'

import store from './store';
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView); 

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './font-awesome.css',
  'ion': './ionicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);


Vue.use(VeeValidate)

// import fontawesome from 'nativescript-fontawesome';
// Vue.use(fontawesome);
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
