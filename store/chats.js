import { db } from '~/plugins/firebase.js';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const state = () => ({
  chats: [],
  currentChatIndex: 0,
  currentMessageIndex: null,
  repliedMessage: '',
  repliedAuthor: '',
  edited: false,
  replied: false,
  test: '',
});

export const mutations = {
  addChat(state, payload) {
    state.chats.push(payload);
  },
  removeChat(state, index) {
    state.chats.splice(index, 1);
  },
  setCurrentChatIndex(state, index) {
    state.currentChatIndex = index;
  },
  addcurrentMessageIndex(state, id) {
    state.currentMessageIndex = id;
  },
  newMessage(state, payload) {
    state.chats[state.currentChatIndex].messages.push(payload);
  },
  deleteMessage(state, i) {
    state.chats[state.currentChatIndex].messages.splice(i, 1);
  },
  updateMessage(state, content) {
    state.chats[state.currentChatIndex].messages[
      state.currentMessageIndex
    ].content = content;
    state.chats[state.currentChatIndex].messages[
      state.currentMessageIndex
    ].edited = true;
  },
  addRepliedMessage(state, msg) {
    state.repliedMessage = msg;
  },
  addRepliedAuthor(state, author) {
    state.repliedAuthor = author;
  },
  editOn(state) {
    state.edited = true;
  },
  editOff(state) {
    state.edited = false;
  },
  replyOn(state) {
    state.replied = true;
  },
  replyOff(state) {
    state.replied = false;
  },
  addTest(state, text) {
    state.test = text;
  },
  setChats(state, chats) {
    state.chats = chats;
  },
};

export const actions = {
  async setChats(context) {
    const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
    try {
      const document = await getDoc(ref);
      context.commit('setChats', document.data().chats);
    } catch (e) {
      console.error(e);
    }
  },
};

export const getters = {
  getIndex: (state) => (id) => {
    return state.chats.findIndex((chat) => chat.id === id);
  },
};
