<template>
  <div
    class="chat-message-wrap"
    :class="message.author === userName ? 'flex-end' : ''"
  >
    <div class="message-wrap">
      <div class="user-name">{{ message.author }}</div>
      <div class="message">
        <div class="replied-msg" v-if="message.replied">
          <b-icon icon="subdirectory-arrow-right" size="is-small"/>
          <div class="replied-content">
            <p class="replied-author">{{ message.repliedAuthor }}</p>
            <p class="replied-text">{{ message.replied }}</p>
          </div>
        </div>
        <div class="msg-content-wrap">
          <div class="msg-content">
            <p>{{ message.content }}</p>
            <span class="message-edited" v-if="message.edited">Edited</span>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <b-dropdown
            v-if="isAdmin"
            aria-role="list"
            :position="
              message.author === userName ? 'is-bottom-left' : 'is-bottom-right'
            "
          >
            <template #trigger>
              <b-button icon-right="dots-vertical" />
            </template>

            <b-dropdown-item aria-role="listitem" @click="removeMessage(index)"
              >Delete</b-dropdown-item
            >
            <b-dropdown-item
              aria-role="listitem"
              @click="editMessage(message.content, index)"
              >Edit</b-dropdown-item
            >
            <b-dropdown-item
              aria-role="listitem"
              @click="replyMessage(message.content, index)"
              >Reply</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { writeChatsToFirestore } from '~/helpers';

export default {
  name: 'AppChatMessage',
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    message: {
      type: Object,
    },
    userName: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  data: () => ({}),
  computed: {
    ...mapState('chats', ['chats', 'currentChatIndex', 'repliedMessage']),
  },
  methods: {
    ...mapMutations('chats', [
      'deleteMessage',
      'addcurrentMessageIndex',
      'editOn',
      'editOff',
      'replyOn',
      'addRepliedMessage',
      'addRepliedAuthor',
    ]),
    writeChatsToFirestore,
    editMessage(content, i) {
      this.editOn();
      this.$nuxt.$emit('edit-message', {content, i})
    },
    replyMessage(i) {
      this.replyOn();
      this.addRepliedMessage(this.message.content);
      this.addRepliedAuthor(this.message.author);
      this.addcurrentMessageIndex(i);
    },
    removeMessage(i) {
      this.editOff();
      this.deleteMessage(i);
    },
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}
.flex-end {
  justify-content: flex-end;
}
.chat-message-wrap {
  display: flex;
}
.chat-message-wrap >>> .dropdown {
  max-width: 50%;
  opacity: 1;
  cursor: auto;
}
.message {
  display: inline-block;
  margin: 2px;
  background: lightgray;
  border-radius: 5px;
  color: steelblue;
  white-space: pre-line;
}
.message-time,
.message-edited {
  color: grey;
  font-size: 10px;
}
.message-area {
  width: 100%;
  box-sizing: border-box;
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

.msg-content-wrap {
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
  padding: 5px 10px;
}

.msg-content-wrap >>> button {
  padding: 0;
  height: auto;
  background: transparent;
  border: none;
}
</style>
