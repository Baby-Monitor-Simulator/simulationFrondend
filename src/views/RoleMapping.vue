<!-- src/components/Login.vue -->
<template>
  <div class="login">
    <h2>Role mapping bla bla</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="userid">id</label>
        <input
          type="text"
          id="userid"
          v-model="userid"
          required
          placeholder="enter id"
        />
      </div>

      <div class="form-group">
        <label for="roleName">id</label>
        <input
          type="text"
          id="roleName"
          v-model="roleName"
          required
          placeholder="Enter roleName"
        />
      </div>
      
      <button type="submit">map role</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userid: '',
      roleName: '',
    };
  },
  methods: {
    async login() {
      try {

        const userData=
        {
          userID: this.userid,
          roleName: this.roleName
        }
        console.log(userData);

        const token = localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_APP_API_ROLEMAPPING}`, userData, {
        headers: {
          Authorization: `Bearer ${token}` // Add JWT token in Authorization header
        }});

      } catch (error) {
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred. Please try again.';
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="email"],
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>