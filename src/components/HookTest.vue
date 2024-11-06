<template>
  <div>
    <h1>Webhook rest</h1>
  </div>
</template>

<script>
// Import WebSocket functions from the external file
import { connect, disconnect, sendUserId} from "./websocket.js";

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
