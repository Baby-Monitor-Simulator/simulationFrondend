<template>
  <div>
    <h1>Hello, Welcome to the Home Page!</h1>
    <p>Your roles:</p>
    <ul>
      <li v-for="role in roles" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.roles = payload.realm_access?.roles || [];
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 5px 0;
}
</style>
