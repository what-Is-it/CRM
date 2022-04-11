import {db} from '../firebase'
import {ref, get, child, set, update} from 'firebase/database'

export default {
  actions: {
    async updateCategory({dispatch}, {title, limit, id}) {
      const uid = !localStorage.getItem('userUid')
        ? await dispatch('getUid')
        : localStorage.getItem('userUid')
      update(ref(db, `/users/${uid}/categories/${id}`), {title, limit})
    },
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        const categories =
          (await get(child(ref(db), `/users/${uid}/categories`))).val() || []
        /* const array = []
        Object.keys(categories).forEach((key) => {
          array.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key,
          })
        })
        return array */
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }))
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = !localStorage.getItem('userUid')
          ? await dispatch('getUid')
          : localStorage.getItem('userUid')
        const id = Math.floor(Math.random() * (10000000000 - 1000000) + 1000000)
        await set(ref(db, `/users/${uid}/categories/${id}`), {
          title,
          limit,
        })
        return {title, limit, id}
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },
  },
}
