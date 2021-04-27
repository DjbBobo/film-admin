import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import actor from './modules/actor'
import cinema from './modules/cinema'
import film from './modules/film'
import hall from './modules/hall'
import orders from './modules/orders'
import session from './modules/session'
import headSwiper from './modules/headSwiper'
import mainSwiper from './modules/mainSwiper'
import district from './modules/district'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    actor,
    cinema,
    film,
    hall,
    orders,
    session,
    headSwiper,
    mainSwiper,
    district
  },
  getters
})

export default store
