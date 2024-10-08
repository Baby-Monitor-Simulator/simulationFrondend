<template>
  <div>
    <h1>Webhook rest</h1>
    <p v-if="response">{{ response }}</p>

    <div>
      <button id="connect" @click="connectToWebSocket">Connect</button>
      <button id="disconnect" @click="disconnectFromWebSocket" disabled>
        Disconnect
      </button>
      <button id="send" @click="sendUserIdToWebSocket">Send User ID</button>

      <!-- Lobby and Coordinates -->
      <div id="lobbyTraffic" style="display: none">
        <h2>Lobbies</h2>
        <table id="lobbies"></table>
      </div>

      <div id="simCoords" style="display: none">
        <h2>Coordinates</h2>
        <table id="coords"></table>
      </div>
    </div>
  </div>
</template>

<script>
// Import WebSocket functions from the external file
import { connect, disconnect, sendUserId } from "./websocket.js";

export default {
  data() {
    return {
      response: null,
      userId: "7dd58dee-9d44-4c63-b7aa-4ed3dec6293b",
    };
  },
  methods: {
    connectToWebSocket() {
      connect(this.userId); // Call connect function with the userId
    },
    disconnectFromWebSocket() {
      disconnect(); // Call disconnect function
    },
    sendUserIdToWebSocket() {
      sendUserId(this.userId); // Call sendUserId function
    },
  },
};
</script>

<style scoped>
/* Add some styling */
</style>
