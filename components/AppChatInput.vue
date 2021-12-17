<template>
  <div class="chat-input">
    <div class="edit-mode" v-if="replied && isAdmin">
      <p>{{ repliedMessage }}</p>
      <b-button
        icon-left="close"
        type="is-text"
        size="is-small"
        @click="replyOff"
      />
    </div>
    <div class="edit-mode" v-if="edited && isAdmin">
      <p>Edit message</p>
    </div>
    <textarea
      class="message-area"
      placeholder="Type a message..."
      v-model="userMessage"
      @keyup.enter.ctrl="addMessage"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { addZero, writeChatsToFirestore } from '~/helpers';

export default {
  name: 'AppChatInput',
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
    },
  },
  data: () => ({
    userMessage: '',
  }),
  computed: {
    ...mapState('chats', [
      'chats',
      'edited',
      'replied',
      'repliedMessage',
      'repliedAuthor',
    ]),
    trimMessage() {
      return this.userMessage.trim();
    },
  },
  methods: {
    ...mapMutations('chats', [
      'newMessage',
      'updateMessage',
      'addcurrentMessageIndex',
      'editOff',
      'replyOff',
    ]),
    addZero,
    writeChatsToFirestore,
    addMessage() {
      if (this.trimMessage) {
        if (this.edited) {
          this.updateMessage(this.trimMessage);
          this.editOff();
        } else if (this.replied) {
          this.newMessage({
            id: Date.now(),
            author: this.userName,
            time: this.getTime(),
            content: this.trimMessage,
            edited: false,
            replied: this.repliedMessage,
            repliedAuthor: this.repliedAuthor,
          });
          this.replyOff();
        } else {
          this.newMessage({
            id: Date.now(),
            author: this.userName,
            time: this.getTime(),
            content: this.trimMessage,
            edited: false,
            replied: '',
          });
        }
        this.userMessage = '';
        this.writeChatsToFirestore();
      }
    },
    getTime() {
      const date = new Date();
      const hours = this.addZero(date.getHours());
      const minutes = this.addZero(date.getMinutes());
      return `${hours}:${minutes}`;
    },
    editMessage(msg) {
      this.userMessage = msg.content;
      this.addcurrentMessageIndex(msg.i);
    },
  },
  created() {
    this.$nuxt.$on('edit-message', (msg) => this.editMessage(msg));
  },
};
</script>

<style scoped>
.message-area {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
}
.edit-mode {
  display: flex;
  justify-content: space-between;
  background: turquoise;
  padding: 5px;
  font-size: 12px;
}

.edit-mode button {
  height: auto;
  padding: 0;
  background: transparent !important;
}
</style>
