<template>
  <section class="container">
    <div>
      <h2>Write to Firestore.</h2>
      {{ title }}
      <div>
        <button @click="writeToFirestore">
          <span>Write now</span>
        </button>
      </div>
      <div>
        <h2>Read from Firestore.</h2>
        <div>
          <button @click="addTest">
            <span> Read now </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { db } from '~/plugins/firebase.js';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
export default {
  data: () => ({
    title: '',
  }),
  async fetch() {
    const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
    try {
      const document = await getDoc(ref);
      this.title = document.data().messages[0].author;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions('chats', ['addTest']),
    async writeToFirestore() {
      const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
      const appData = await getDoc(ref);
      const msgs = appData.data().messages;
      console.log(msgs);
      const document = {
        messages: [
          ...appData.data().messages,
          { content: 'Hi', author: 'User2' },
        ],
      };
      try {
        await updateDoc(ref, document);
      } catch (e) {
        console.error(e);
      }
    },
    async readFromFirestore() {
      const ref = doc(db, 'data', 'ouUx1yLJyVdPZNtcYEGG');
      try {
        const document = await getDoc(ref);
        console.log(document.data().name);
      } catch (e) {
        alert('Error!');
        console.error(e);
      }
    },
  },
  created() {
    this.addTest();
  },
};
</script>
<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>