<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";

export default {
  data() {
    const { t } = useI18n();
    return {
      lobbyCode: 1,
    };
  },
  methods: {
    extractUUID() {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.sub;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    },
    async joinLobby() {
      try {
        const token = localStorage.getItem("token");
        const participant = {
          userId: this.extractUUID(),
          lobbyId: this.lobbyCode,
        };
        console.log(participant);

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_PARTICIPANT}`,
          participant,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.lobbyId != null) {
          console.log("lobby was joined");
          this.$router.push(`/lobby/${this.lobbyCode}`);
        }
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred. Please try again.";
      }
    },
  },
};
</script>

<template>
  <div class="lobby-container">
    <div class="lobby-form">
      <h1 class="title">{{ $t("lobby.joinTitle") }}</h1>
      <form @submit.prevent="joinLobby">
        <div class="form-group">
          <input type="number" id="lobby-code" v-model="lobbyCode" required min="1" />
        </div>
        <button type="submit" class="submit-btn">{{ $t("lobby.joinLobby") }}</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.lobby-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fc;
  font-family: "Arial", sans-serif;
}

.lobby-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #4f4f4f;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease-in-out;
}

.form-group input:focus {
  border-color: #4c9bf1;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4c9bf1;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #3578d6;
}

.submit-btn:active {
  background-color: #2d64a3;
}
</style>
