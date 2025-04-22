<!-- src/components/Login.vue -->
<template>
  <div class="login">
    <h2>{{ translations.roles.value.title }}</h2>
    <form @submit.prevent="mapRole">
      <div class="form-group">
        <label for="userid">{{ translations.roles.value.userName }}</label>
        <input
          type="text"
          id="userid"
          v-model="userid"
          required
          placeholder="Enter user ID"
        />
      </div>

      <div class="form-group">
        <label for="roleName">{{ translations.roles.value.roleName }}</label>
        <input
          type="text"
          id="roleName"
          v-model="roleName"
          required
          placeholder="Enter role name"
        />
      </div>

      <button type="submit">{{ translations.roles.value.saveChanges }}</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useTranslations } from "@/composables/useTranslations";

export default {
  data() {
    return {
      userid: "",
      roleName: "",
      errorMessage: "",
      translations: useTranslations(),
    };
  },
  methods: {
    async mapRole() {
      try {
        const userData = {
          userID: this.userid,
          roleName: this.roleName,
        };
        console.log(userData);

        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`${import.meta.env.VITE_APP_API_ROLEMAPPING}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
        } else {
          throw new Error("Authorization token is missing");
        }
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : this.translations.common.value.error;
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
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
