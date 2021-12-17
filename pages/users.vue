<template>
  <div class="users-page">
    <div class="errors-wrap">
      <p class="errors" v-for="(error, i) in errors" :key="`err-${i}`">
        {{ error }}
      </p>
    </div>

    <div class="add-name">
      <b-field label="Add new user">
        <bInput v-model="name" type="text" placeholder="Add name" reguired />
      </b-field>
      <b-button type="is-success" @click.prevent="addNewUser">Submit</b-button>
    </div>

    <b-table :data="users">
      <b-table-column field="id" label="ID" width="40" v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column field="name" label="Name" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="Delete" v-slot="props">
        <b-button
          @click="deleteUser(props.row.id)"
          size="is-small"
          type="is-danger"
          icon-left="delete"
        />
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import { writeUsersToFirestore } from '~/helpers';

export default {
  data: () => ({
    name: '',
    errors: [],
    isError: true,
  }),
  computed: {
    ...mapState('users', ['users']),
    ...mapGetters('users', ['getIndex']),
  },
  methods: {
    ...mapMutations('users', ['addUser', 'removeUser']),
    ...mapActions('users', ['setUsers']),
    writeUsersToFirestore,
    addNewUser() {
      this.errors = [];
      if (this.name && !this.isUserExist()) {
        this.addUser({
          id: Date.now(),
          name: this.name,
        });
        this.name = '';
        this.writeUsersToFirestore();
      } else {
        if (this.isUserExist()) {
          this.errors.push(
            'This uer is already exist, please select another name!'
          );
        }
        if (!this.name) {
          this.errors.push('Please add a name!');
        }
      }
    },
    deleteUser(id) {
      this.removeUser(this.getIndex(id));
      this.writeUsersToFirestore();
    },
    isUserExist() {
      return this.users.some((user) => user.name === this.name);
    },
  },
  
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}
.errors {
  color: red;
}
.users-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.add-name {
  width: 50%;
}
</style>
