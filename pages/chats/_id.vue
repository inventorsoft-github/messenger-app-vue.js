<template>
  <div class="chat-page">
    <div class="chats-wrap">
      <AppChat is-admin user-name="admin"></AppChat>
      <AppChat :user-name="name" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import AppChat from '~/components/AppChat.vue';

export default {
  components: {
    AppChat,
  },
  data: () => ({
    selected: '',
  }),
  computed: {
    ...mapState('chats', ['currentChatIndex', 'chats']),
    ...mapGetters('chats', ['getIndex']),
    name() {
      return this.chats[this.currentChatIndex]?.name;
    },
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    ...mapMutations('chats', ['setCurrentChatIndex']),
  },
  created() {
    this.setCurrentChatIndex(this.getIndex(+this.$route.params.id));
  },
};
</script>

<style scoped>
.chat-page {
  padding: 20px;
}

.chats-wrap {
  padding: 20px 0;
  display: flex;
  height: 90vh;
}
.info {
  margin-left: 10px;
}
</style>
