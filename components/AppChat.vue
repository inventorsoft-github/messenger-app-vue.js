<template>
  <div class="user-wrap" v-if="chats[currentChatIndex]">
    <div class="top">
      <div class="user">{{ userName }}</div>
      <div class="messages-wrap">
        <AppChatMessage
          v-for="(message, i) in chats[currentChatIndex].messages"
          :key="`msg-${i}`"
          :message="message"
          :is-admin="isAdmin"
          :user-name="userName"
          :index="i"
        />
      </div>
    </div>
    <div class="textarea-wrap bottom">
      <AppChatInput :is-admin="isAdmin" :user-name="userName" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppChatMessage from '~/components/AppChatMessage.vue';
import AppChatInput from '~/components/AppChatInput.vue';
import { addZero, writeChatsToFirestore } from '~/helpers';

export default {
  components: {
    AppChatMessage,
    AppChatInput,
  },
  name: 'AppChat',
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
    },
  },

  computed: {
    ...mapState('chats', ['chats', 'currentChatIndex']),
  },
  methods: {
    ...mapActions('chats', ['setChats']),
    writeChatsToFirestore,
  },
  beforeDestroy() {
    this.writeChatsToFirestore();
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}
.user-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  margin: 10px;
  background: aliceblue;
}
.user {
  text-align: center;
  font-weight: bold;
}
.user-wrap .top {
  overflow-y: auto;
  height: 100%;
}
</style>
