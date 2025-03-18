<script>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { connectLobby, disconnect, sendLobbyMessage } from "@/components/websocket";
import eventBusGraphData from "@/components/eventBusGraphData.js";
import { hasRole } from "@/components/RoleManager";
import axios from "axios";
import { useRouter } from "vue-router";
import { useTranslations } from "@/composables/useTranslations";

export default {
  props: {
    lobbyCode: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      lobbyStarting: false,
      hasRole,
      participants: [],
      lobbyCode: this.$route.params.lobbyCode,
      translations: useTranslations(),
    };
  },
  onMounted() {
    this.connectToLobby();
    this.getLobbyParticipants();
    eventBusGraphData.on("arrayUpdated", this.handleLobbyMessage);
  },
  beforeUnmount() {
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
      if (Array.isArray(message)) {
        return;
      }
      if (message && message.starting === true) {
        this.lobbyStarting = true;
      }
    },
    async getLobbyParticipants() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_PARTICIPANT}/lobby/${
            this.$route.params.lobbyCode
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          this.participants = response.data;
          this.getUserNames();
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    },
    async getUserNames() {
      console.log("get Usernames....");
      const updatedParticipants = [];
      for (const participant of this.participants) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_USERS}/name/${participant.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            participant.userName = response.data;
            updatedParticipants.push(participant);
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
      this.participants = updatedParticipants;
    },
    async startLobby() {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${import.meta.env.VITE_APP_API_LOBBY}/${this.lobbyCode}/activate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        sendLobbyMessage("LOBBY_STARTED", this.lobbyCode, {
          message: "De lobby is gestart. Success!",
        });
        console.log("WebSocket-bericht verzonden.");
        this.router.push({
          name: "dashboard",
          params: { lobbyId: this.lobbyCode },
        });
      } catch (error) {
        console.error("Er is een fout opgetreden:", error);
      }
    },
  },
};
</script>

<template>
  <div class="lobby-container">
    <div class="lobby-form">
      <h1 class="title">
        {{
          lobbyStarting
            ? translations.lobby.value.lobbyStarted
            : translations.lobby.value.waitingForLobby
        }}
      </h1>
      <h2 class="title">ID:{{ lobbyCode }}</h2>
      <h3 class="lobby-text" v-if="lobbyStarting">
        {{ translations.lobby.value.simulationStarting }}
      </h3>
      <!-- New section to display participants -->
      <ul v-if="participants.length">
        <h3>{{ translations.lobby.value.activeParticipants }}:</h3>
        <li v-for="participant in participants" :key="participant.userId">
          {{ participant.userName }}
        </li>
      </ul>
      <button class="start-button" @click="startLobby">
        {{ translations.lobby.value.startLobby }}
      </button>
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

.lobby-text {
  text-align: center;
  font-size: 1rem;
  color: #333;
}

.start-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #0056b3;
}

.start-button:active {
  background-color: #004494;
}
</style>
