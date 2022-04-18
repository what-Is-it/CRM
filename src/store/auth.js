import {auth, db} from '../firebase'
import {ref, set} from 'firebase/database'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export default {
  actions: {
    async login({commit, dispatch}, {email, password}) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        await dispatch('getUid')
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        await set(ref(db, `/users/${uid}/info`), {
          bill: 10000,
          name: name,
        })
      } catch (e) {
        commit('setError', e)
        throw new Error(e)
      }
    },
    getUid() {
      const user = auth.currentUser
      localStorage.setItem('userUid', user.uid)
      return user ? user.uid : null
    },
    async logout({commit}) {
      await signOut(auth)
      commit('clearInfo')
      localStorage.setItem('userUid', '')
    },
  },
}
