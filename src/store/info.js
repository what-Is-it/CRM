import {db} from '../firebase'
import {ref, child, get, update} from 'firebase/database'
export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async updateInfo({commit, dispatch, getters}, toUpdate) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        const updateData = {...getters.info, ...toUpdate}
        await update(ref(db, `/users/${uid}/info`), updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },
    async userInfo({commit, dispatch}) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        console.log((await get(child(ref(db), `/users/${uid}/info`))).val())
        const info = (await get(child(ref(db), `/users/${uid}/info`))).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
}
