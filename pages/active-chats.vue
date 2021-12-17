<template>
  <div class="active-chats">
    <div class="cards-wrap">
      <div class="cards" :style="{ width: cardWidth }">
        <AppChatCard
          v-for="chat in chatsFilter"
          :key="chat.id"
          :chat="chat"
          :chat-is-open="chatIsOpen"
          @click.native="openChat(chat.id)"
        />
      </div>

      <transition name="fade">
        <div v-if="chatIsOpen" class="app-chat-wrap w-100 h-100">
          <div class="button-wrap">
            <b-button rounded @click="chatIsOpen = false">
              <b-icon icon="close" size="is-small"></b-icon>
            </b-button>
          </div>
          <AppChat is-admin user-name="admin" class="h-100" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import AppChatCard from '~/components/AppChatCard.vue';
import AppChat from '~/components/AppChat.vue';

export default {
  components: {
    AppChatCard,
    AppChat,
  },
  data() {
    return {
      chatIsOpen: false,
    };
  },
  computed: {
    ...mapState('chats', ['chats', 'currentChatIndex']),
    ...mapGetters('chats', ['getIndex']),
    chatsFilter() {
      return this.chats.filter((chat) => chat.messages.length);
    },
    cardWidth() {
      return !this.chatIsOpen ? '100%' : '180px';
    },
  },
  methods: {
    ...mapMutations('chats', ['setCurrentChatIndex']),
    openChat(id) {
      this.setCurrentChatIndex(this.getIndex(id));
      this.chatIsOpen = true;
    },
  },
};
</script>

<style scoped>
.active-chats {
  margin: 0px;
}

.cards-wrap {
  display: flex;
  height: 90vh;
}

.w-100 {
  width: 100%;
}
.h-100 {
  height: 100%;
}

.button-wrap {
  padding: 10px;
  text-align: right;
  background: #f0f8ff;
}
.button-wrap >>> .button.is-rounded {
  display: inline-block;
  padding-left: 1em;
  padding-right: 1em;
}

.cards {
  transition: all 0.5s linear;
}

.cards-wrap >>> .user-wrap {
  margin: 0;
  padding-top: 0;
}

.app-chat-wrap {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
