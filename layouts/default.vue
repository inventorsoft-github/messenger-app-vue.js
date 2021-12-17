<template>
  <div class="default-layout">
    <div class="links-wrap">
      <nuxt-link to="/users" class="info">
        <b-button type="is-info">Users</b-button>
      </nuxt-link>
      <nuxt-link to="/chats" class="info">
        <b-button type="is-info">Chats</b-button>
      </nuxt-link>
      <nuxt-link to="/active-chats" class="info">
        <b-button type="is-info">Active Chats</b-button>
      </nuxt-link>
    </div>
    <Nuxt />
  </div>
</template>



<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions('users', ['setUsers']),
    ...mapActions('chats', ['setChats']),
  },
  created() {
    this.setUsers();
    this.setChats();
  },
};
</script>

<style scoped>
.links-wrap {
  padding: 20px;
  display: flex;
  column-gap: 10px;
}

.info {
  display: block;
}
</style>
