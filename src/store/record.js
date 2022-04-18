import {db} from '../firebase'
import {ref, set, get, child} from 'firebase/database'
export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        const id = Math.floor(Math.random() * (10000000000 - 1000000) + 1000000)
        return await set(ref(db, `/users/${uid}/records/${id}`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        const records =
          (await get(child(ref(db), `/users/${uid}/records`))).val() || {}
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        const record =
          (await get(child(ref(db), `/users/${uid}/records/${id}`))).val() || {}
        return {...record, id: id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
