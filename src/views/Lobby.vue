<script>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { connectLobby, disconnect } from "@/components/websocket";
import eventBusGraphData from "@/components/eventBusGraphData.js";
import { hasRole } from "@/components/RoleManager";

export default {
  props: {
    lobbyCode: {
      type: Number,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      lobbyStarting: false,
      hasRole,
    };
  },
  mounted() {
    this.connectToLobby();
    // Add event listener for websocket messages
    eventBusGraphData.on("arrayUpdated", this.handleLobbyMessage);
  },
  beforeUnmount() {
    // Clean up listeners and connection
    eventBusGraphData.off("arrayUpdated", this.handleLobbyMessage);
    disconnect();
  },
  methods: {
    connectToLobby() {
      try {
        connectLobby(this.lobbyCode);
        console.log("Connected to lobby websocket");
      } catch (error) {
        console.error("Failed to connect to lobby:", error);
      }
    },
    handleLobbyMessage(message) {
      console.log("Received message:", message);

      // Check if message is an array
      if (Array.isArray(message)) {
        console.log("Received array message");
        // Handle array message if needed
        return;
      }

      // Check for starting property
      if (message && message.starting === true) {
        console.log("Received start command");
        this.lobbyStarting = true;
        // You might want to redirect to simulation or handle the start in another way
      }
    },
  },
};
</script>

<template>
  <div class="lobby-container">
    <div class="lobby-form" v-if="hasRole('deelnemer')">
      <h1 class="title">
        {{ lobbyStarting ? $t("lobby.lobbyStarted") : $t("lobby.waitingForLobby") }}
      </h1>
      <h2 class="title">{{ lobbyCode }}</h2>
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
