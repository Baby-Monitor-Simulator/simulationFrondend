<template>
  <div>
    <h1>{{ translations.home.welcome }}</h1>
    <p>{{ translations.home.yourRoles }}:</p>
    <ul>
      <li v-for="role in filteredRoles" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>

<script>
import { useTranslations } from "@/composables/useTranslations";

export default {
  data() {
    return {
      roles: [],
      specificRolesList: ["admin", "deelnemer", "instructeur"],
      translations: useTranslations(),
    };
  },
  computed: {
    filteredRoles() {
      // Filter out system roles and keep only specific roles
      return this.roles.filter((role) => this.specificRolesList.includes(role));
    },
  },
  mounted() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.roles = payload.realm_access?.roles || [];
        localStorage.setItem("userId", payload.sub);
      } catch (error) {
        console.error("Error decoding token:", error);
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
