<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <div class="login">
      <h2>{{ translations.login.value.title }}</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">{{ translations.login.value.email }}</label>
          <input
            type="text"
            id="email"
            v-model="email"
            required
            :placeholder="translations.login.value.emailPlaceholder"
          />
        </div>

        <div class="form-group">
          <label for="password">{{ translations.login.value.password }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            :placeholder="translations.login.value.passwordPlaceholder"
          />
        </div>

        <button type="submit">{{ translations.login.value.loginButton }}</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <!-- Register navigation button -->
        <p>
          {{ translations.login.value.noAccount }}
          <button @click="goToRegister" class="link-button">
            {{ translations.login.value.register }}
          </button>
        </p>
      </form>
      <!-- Only show temp users in dev mode -->
      <div v-if="devMode">
        <br />
        <v-divider></v-divider>
        <br />
        <h2>{{ translations.login.value.tempUsers }}</h2>
        <button @click="fillTempUser('admin')" class="link-button">
          {{ translations.login.value.tempAdmin }}
        </button>
        <button @click="fillTempUser('deelnemer')" class="link-button">
          {{ translations.login.value.tempDeelnemer }}
        </button>
        <button @click="fillTempUser('instructeur')" class="link-button">
          {{ translations.login.value.tempInstructeur }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { dispatchTokenChangedEvent } from "../utils/events";
import { loadRoles } from "../components/RoleManager";
import { useTranslations } from "@/composables/useTranslations";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      devMode: import.meta.env.VITE_DEV_MODE === "true",
      translations: useTranslations(),
    };
  },

  mounted() {
    localStorage.clear();
  },

  methods: {
    async login() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_LOGIN}`,
          userData
        );

        if (response.status === 200) {
          // Store the token in localStorage
          const token = response.data.startsWith("Bearer ")
            ? response.data.split(" ")[1]
            : response.data;
          localStorage.setItem("token", token);

          // Dispatch token-changed event using the utility
          dispatchTokenChangedEvent();

          // Try a direct approach to trigger role reload
          loadRoles();

          // Small delay before navigation to ensure event is processed
          setTimeout(() => {
            // Navigate to the home page
            this.$router.push("/");
          }, 100);
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
    fillTempUser(role) {
      if (role === "admin") {
        localStorage.setItem(
          "token",
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IndNYVhRdFZyNWhXTlJuVl8zT0p6YW1PRm1MSVBXaGx0M3B1Y2dXZ0VRRTAifQ.eyJleHAiOjE4MzQ2ODczNjIsImlhdCI6MTczNDY4NzA2MiwianRpIjoiNzE4ZTM0NTUtZDhlOC00YWYzLWFmNzYtNzg5ZGI3MmU2NWU3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9CYWJ5bW9uaXRvciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkOGI5ODI4ZS1mYmI3LTQ2YTgtOGZhYS0yMmYxNTIxZGRjNGIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWJ5bW9uaXRvci1jbGllbnQtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjMwODBlNDI4LTZlZWEtNDcwMS1hMTEwLTdjMWQ4MmNiZTg3OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MTczLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmFieW1vbml0b3IiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiYWRtaW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJiYWJ5bW9uaXRvci1jbGllbnQtYXBpIjp7InJvbGVzIjpbImNsaWVudF9kZWVsbmVtZXIiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjMwODBlNDI4LTZlZWEtNDcwMS1hMTEwLTdjMWQ4MmNiZTg3OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuZXd1c2VyQG5ld3VzZXIuY29tIiwiZW1haWwiOiJuZXd1c2VyQG5ld3VzZXIuY29tIn0.fc_Z7ZiKMFAJ_mGspwx0l8vvWFFor-B0UOBuwTPUVdWEAaMSXzPQg177mYkxlFW9JPHAXPboPwlvxaK66EoDqEgjmnA-GDzeJITG6VfeFtD48RwW7XHtn84YvE3Ivwc2LKghqoX6Twh9ImuNBwUp-p9K_KI9XpP6U_s4FbPoIYF02oszYgkXpLUWoda3_XYnw7H4cyGjUOrAg1r6x4CpUeeogTWjccLT58t-4UhTxTo2ufyRK4g0h8W2isaPtzokGP8VG8z-uoCJju5bR0VeNUleRl53MouHieVrYyMoIkYQKI5AhBqPmWv4vjoYhrR8qZQs0csa_hi9NVysm_yOkA"
        );
      } else if (role === "deelnemer") {
        localStorage.setItem(
          "token",
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IndNYVhRdFZyNWhXTlJuVl8zT0p6YW1PRm1MSVBXaGx0M3B1Y2dXZ0VRRTAifQ.eyJleHAiOjE4MzQ2ODczNjIsImlhdCI6MTczNDY4NzA2MiwianRpIjoiNzE4ZTM0NTUtZDhlOC00YWYzLWFmNzYtNzg5ZGI3MmU2NWU3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9CYWJ5bW9uaXRvciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkOGI5ODI4ZS1mYmI3LTQ2YTgtOGZhYS0yMmYxNTIxZGRjNGIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWJ5bW9uaXRvci1jbGllbnQtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjMwODBlNDI4LTZlZWEtNDcwMS1hMTEwLTdjMWQ4MmNiZTg3OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MTczLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmFieW1vbml0b3IiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVlbG5lbWVyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYmFieW1vbml0b3ItY2xpZW50LWFwaSI6eyJyb2xlcyI6WyJjbGllbnRfZGVlbG5lbWVyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIzMDgwZTQyOC02ZWVhLTQ3MDEtYTExMC03YzFkODJjYmU4NzgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoibmV3dXNlckBuZXd1c2VyLmNvbSIsImVtYWlsIjoibmV3dXNlckBuZXd1c2VyLmNvbSJ9.I3RMx64kWN7BaLYaLDq9f0Wh3VSPCpyLbJEt_iGWL57X70Vss-tCpEFyrfXralOmGWV-BieevlEDNVIu-supYGWDF7W0BzbtaUArqCwcMSO4iki0ozD_lk2aCZXI-MN1wAyMIkB_g9AVPXzCD-jlJEhblUjr89axK6snXfKvvvkiacBS-ePcibp1Xg1wauf-o6EUkB7X85o5Y_J4D30H88pULzal2sG5rUiKWUW5bvYdP4FaHMwHWPBrWx-OXKMuwdg6fjTim6SFsKq2R83Syb6XVXd9_teFGCJHvBTKUIBE2v5JkWJ3iIPYZ9Y2Z4u5Km4AA1h8DimuGuV9uQHPTg"
        );
      } else if (role === "instructeur") {
        localStorage.setItem(
          "token",
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IndNYVhRdFZyNWhXTlJuVl8zT0p6YW1PRm1MSVBXaGx0M3B1Y2dXZ0VRRTAifQ.eyJleHAiOjE4MzQ2ODczNjIsImlhdCI6MTczNDY4NzA2MiwianRpIjoiNzE4ZTM0NTUtZDhlOC00YWYzLWFmNzYtNzg5ZGI3MmU2NWU3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9CYWJ5bW9uaXRvciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkOGI5ODI4ZS1mYmI3LTQ2YTgtOGZhYS0yMmYxNTIxZGRjNGIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWJ5bW9uaXRvci1jbGllbnQtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjMwODBlNDI4LTZlZWEtNDcwMS1hMTEwLTdjMWQ4MmNiZTg3OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MTczLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmFieW1vbml0b3IiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiaW5zdHJ1Y3RldXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJiYWJ5bW9uaXRvci1jbGllbnQtYXBpIjp7InJvbGVzIjpbImNsaWVudF9kZWVsbmVtZXIiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjMwODBlNDI4LTZlZWEtNDcwMS1hMTEwLTdjMWQ4MmNiZTg3OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuZXd1c2VyQG5ld3VzZXIuY29tIiwiZW1haWwiOiJuZXd1c2VyQG5ld3VzZXIuY29tIn0.24p0Rru6kjsu8_dhbETNJWhvV6R0iO6_xCBo37vfaWDasxXPnNfAD39zpnE_ExhCrr_VoxxEAbPioW7n3bf0sSzBAJiZt_nup6HWC2jNxkceaFFpriqVdyohCO-bm_F-IJh0OQlNzeKijKmLtYI8-etcoGJMhxn3IOyBkZFTqUBgBAoO-PR0tityboFLYem_mSl0xgmadgBAfoSm9aY8do1sv3_u5aJ1HWQIxmzLvT8A0he7n8_vLaH0l6rZFxEY8o2K-FqPHPFJvMzGFqHuPb6bzBxiRul185gZ9h1HaZqSjGHEYzmrTiF2a05Fbe6z-4oYTWx6GzQXiPp19j5iXg"
        );
      }

      // Dispatch token-changed event using the utility
      dispatchTokenChangedEvent();

      // Try a direct approach to trigger role reload
      loadRoles();

      // Small delay before navigation to ensure event is processed
      setTimeout(() => {
        this.$router.push("/");
      }, 100);
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
