<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
export default {
  data() {
    const { t } = useI18n();
    return {
      lobbyCode: 1,
      lobbyStarting: true,
    };
  },
  methods: {
    async joinLobby() {
      try {
        const lobbyData = {
          lobbyCode: this.lobbyCode,
          token: localStorage.getItem("token"),
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_LOBBY}`,
          lobbyData
        );
        if (response.data.success) {
          console.log("lobby was joined");
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
      <h1 class="title">
        {{ lobbyStarting ? $t("lobby.lobbyStarted") : $t("lobby.waitingForLobby") }}
      </h1>
      <p class="lobby-text" v-if="lobbyStarting">
        {{ $t("lobby.simulationStarting") }}
      </p>
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
.lobby-text {
  text-align: center;
  font-size: 1rem;
  color: #333;
}
</style>
