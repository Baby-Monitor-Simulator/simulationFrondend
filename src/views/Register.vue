<!-- src/components/Register.vue -->
<template>
  <div class="register">
    <h2>{{ translations.register.value.title }}</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">{{ translations.register.value.username }}:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          :placeholder="translations.register.value.usernamePlaceholder"
        />
      </div>

      <div class="form-group">
        <label for="email">{{ translations.register.value.email }}:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          :placeholder="translations.register.value.emailPlaceholder"
        />
      </div>

      <div class="form-group">
        <label for="password">{{ translations.register.value.password }}:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          :placeholder="translations.register.value.passwordPlaceholder"
        />
      </div>

      <button type="submit">{{ translations.register.value.registerButton }}</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Login navigation button -->
      <p>
        {{ translations.register.value.alreadyAccount }}
        <button @click="goToLogin" class="link-button">
          {{ translations.register.value.login }}
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useTranslations } from "@/composables/useTranslations";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
      translations: useTranslations(),
    };
  },
  methods: {
    async register() {
      try {
        console.log("I reach here");
        console.log(this.password);

        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_REGISTER}`,
          userData
        );

        if (response.data.success) {
          this.$router.push("/login");
        } else {
          this.errorMessage = "Registration failed. Please try again.";
        }
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred. Please try again.";
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
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
