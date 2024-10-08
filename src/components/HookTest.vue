<template>
  <div>
    <h1>Webhook rest</h1>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: null, // This will store the webhook response
    };
  },
  mounted() {
    // When the component is mounted, call the webhook
    this.callWebhookOnMount();
  },
  methods: {
    async callWebhookOnMount() {
      try {
        const res = await fetch("http://localhost:8080/app/simulation", 
        {
          method: "FETCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: "Webhook data on mount" }),
        });

        const json = await res.json();
        this.response = json.message; // Store the response from the server
        console.log(this.response);
      } catch (error) {
        this.response = "Error: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* Add some styling */
</style>
