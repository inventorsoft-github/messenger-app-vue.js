<template>
  <div
    class="chat-card"
    :class="{
      'is-active': chats[currentChatIndex].name === chat.name && chatIsOpen,
    }"
  >
    <p>{{ chat.name }}</p>
    <div v-if="!chatIsOpen" class="chat-content">
      <div class="replied-msg" v-if="chat.messages[lastIndex].replied">
        <b-icon icon="subdirectory-arrow-right" size="is-small" />
        <div class="replied-content">
          <p class="replied-author">
            {{ chat.messages[lastIndex].repliedAuthor }}
          </p>
          <p class="replied-text">
            {{ chat.messages[lastIndex].replied }}
          </p>
        </div>
      </div>
      <p>{{ chat.messages[lastIndex].content }}</p>
      <span class="message-edited" v-if="chat.messages[lastIndex].edited"
        >Edited</span
      >
      <span class="message-time">{{ chat.messages[lastIndex].time }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppChatCard',
  props: {
    chatIsOpen: {
      type: Boolean,
      default: false,
    },
    chat: {
      type: Object,
    },
  },
  computed: {
    ...mapState('chats', ['chats', 'currentChatIndex']),
    lastIndex() {
      return this.chat.messages.length - 1;
    },
  },
};
</script>

<style scoped>
.chat-card {
  border-radius: 5px;
  background: aliceblue;
  padding: 20px;
  margin: 20px;
}
.chat-card p {
  word-break: break-word;
}
.chat-card.is-active {
  color: #fff;
  background: blueviolet;
}
.chat-content {
  background: lightslategrey;
  padding: 10px;
}

.replied-msg {
  display: flex;
  padding: 5px 10px;
  background: whitesmoke;
  color: #444;
  line-height: 1;
}
.replied-msg .replied-author {
  font-weight: bold;
}
.replied-msg .replied-text {
  font-style: italic;
}
.message-time,
.message-edited {
  font-size: 10px;
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

</style>
