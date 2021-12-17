<template>
  <select :value="select" @input="changeSelect">
    <option disabled value="">Please select user</option>
    <option v-for="(user, i) in users" :key="`user-${i}`">
      {{ user.name }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppUserSelect',
  data: () => ({ select: '' }),
  computed: {
    ...mapState('appUsers', ['users']),
  },
  methods: {
    changeSelect(e) {
      this.$emit('select', e.target.value);
    },
  },
};
</script>

<style scoped>
</style>
