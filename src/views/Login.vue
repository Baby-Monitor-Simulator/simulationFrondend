<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="text"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <!-- Register navigation button -->
        <p>
          Don’t have an account?
          <button @click="goToRegister" class="link-button">Register here</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },

  mounted() {
    console.log("jwt cleared");
    localStorage.clear();
  },

  methods: {
    async login() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        };
        //Why are we logging the password?????
        //console.log(userData);

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_LOGIN}`,
          userData
        );

        if (response.status === 200) {
          // Store the token in localStorage
          const token = response.data.startsWith("Bearer ")
            ? response.data.split(" ")[1]
            : response.data;
          console.log(token);
          localStorage.setItem("token", token);

          // Navigate to the LobbyCreate page
          this.$router.push("/");
        } else {
          // Handle cases where no token is returned
          this.errorMessage = "Login successful, but no token received.";
        }
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred. Please try again.";
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100vw;
}
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
