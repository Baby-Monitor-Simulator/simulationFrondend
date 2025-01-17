<template>
  <div class="lobby-container">
    <h1>Lobby</h1>
    <p>Lobbycode: <strong>{{ lobbyCode }}</strong></p>
    <button class="start-button" @click="startLobby">Start Lobby</button>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { connectLobby, sendLobbyMessage } from "@/components/websocket";

export default {
  name: "Lobby",
  props: {
    lobbyCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const websocket = import.meta.env.VITE_APP_WEBSOCKET_LOBBIES;
    // const websocket = connectLobby(props.lobbyCode);
    console.log("VITE_APP_WEBSOCKET_LOBBY:", import.meta.env.VITE_APP_WEBSOCKET_LOBBY);
    console.log("Connecting to WebSocket URL:", websocket);
    console.log("LobbyCode ontvangen in props:", props.lobbyCode);

    const startLobby = async () => {
try {
  console.log("Lobby gestart:", props.lobbyCode);

  // Controleer de volledige URL die wordt gebruikt
  console.log(`${import.meta.env.VITE_APP_API_LOBBY}/${props.lobbyCode}/activate`);

  // API-aanroep om de lobby te activeren
  const token = localStorage.getItem("token");
  await axios.patch(
    `${import.meta.env.VITE_APP_API_LOBBY}/${props.lobbyCode}/activate`,
    {}, // Geen body nodig
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Lobby is succesvol geactiveerd");

  // Stuur een bericht via WebSocket
  sendLobbyMessage("LOBBY_STARTED", props.lobbyCode, {
    message: "De lobby is gestart. Success!",
  });

  console.log("WebSocket-bericht verzonden: De lobby is gestart. Success!");

  // Redirect naar de dashboardpagina en geef de lobbyId mee
  router.push({
    name: "dashboard",
    params: { lobbyId: props.lobbyCode }, // Of gebruik props.lobbyId als dat je ID is
  });
} catch (error) {
  console.error("Er is een fout opgetreden bij het activeren van de lobby:", error);
}
};


    return {
      startLobby,
    };
  },
};
</script>

<style scoped>
.lobby-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
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
</style>