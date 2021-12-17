import { db } from '~/plugins/firebase.js';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const state = () => ({
  users: [],
  currentUserIndex: 0,
  currentMessage: '',
  test: []
});

export const mutations = {
  addUser(state, payload) {
    state.users.push(payload);
  },
  removeUser(state, index) {
    state.users.splice(index, 1);
  },
  setCurrentUserIndex(state, index) {
    state.currentUserIndex = index;
  },
  setUsers(state, users) {
    state.users = users;
  },
};

export const actions = {
  async setUsers(context) {
    const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
    try {
      const document = await getDoc(ref);
      context.commit('setUsers', document.data().users);
    } catch (e) {
      console.error(e);
    }
  },
};

export const getters = {
  getIndex: (state) => (id) => {
    return state.users.findIndex((user) => user.id === id);
  },
};

