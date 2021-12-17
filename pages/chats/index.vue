<template>
  <div class="chats">
    <b-button v-if="usersFilter.length" type="is-link" @click="isNewChat = true"
      >Start new chat</b-button
    >

    <div class="select-user" v-show="isNewChat && usersFilter.length">
      <b-field>
        <b-select v-model="selected" placeholder="Select a user name">
          <option disabled value="">Please select user</option>
          <option v-for="user in usersFilter" :value="user.name" :key="user.id">
            {{ user.name }}
          </option>
        </b-select>
      </b-field>
      <b-button type="is-success" @click="addNewChat(chat)">Submit</b-button>
    </div>

    <b-table :data="chats">
      <b-table-column v-slot="props" field="id" label="ID" width="40">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column v-slot="props" field="name" label="Name">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column v-slot="props" field="messages" label="Messages">
        {{ props.row.messages.length }}
      </b-table-column>
      <b-table-column v-slot="props" field="messages" label="Open">
        <nuxt-link :to="`chats/${props.row.id}`">
          <b-button type="is-success" size="is-small" icon-left="eye">
          </b-button>
        </nuxt-link>
      </b-table-column>

      <b-table-column v-slot="props" label="Delete">
        <b-button
          @click="removeChat(getIndex(props.row.id))"
          type="is-danger"
          size="is-small"
          icon-left="delete"
        />
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { writeChatsToFirestore } from '~/helpers';

export default {
  data() {
    return {
      isNewChat: false,
      selected: '',
    };
  },
  computed: {
    ...mapState('chats', ['chats']),
    ...mapState('users', ['users']),
    ...mapGetters('chats', ['getIndex']),
    chat() {
      return { id: Date.now(), name: this.selected, messages: [] };
    },
    usersFilter() {
      return this.users.filter(
        (user) =>
          user.name !==
          this.chats.map((chat) => chat.name).find((name) => name === user.name)
      );
    },
  },
  methods: {
    ...mapMutations('chats', ['addChat', 'removeChat']),
    ...mapActions('chats', ['setChats']),
    writeChatsToFirestore,
    addNewChat(chat) {
      if (!this.isChatexist() && this.selected) {
        this.addChat(chat);
        this.selected = '';
        this.writeChatsToFirestore();
      }
    },
    isChatexist() {
      return this.chats.some((chat) => chat.name === this.selected);
    },
  },
};
</script>

<style scoped>
.chats {
  padding: 20px;
}
.select-user {
  padding: 20px 0;
}

.links {
  margin-bottom: 20px;
}
</style>
