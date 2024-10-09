import { reactive } from 'vue';

const eventBusGraphData = reactive({
  events: {}, // Object to store events and their listeners

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  },
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; // Initialize the array if it doesn't exist
    }
    this.events[event].push(callback); // Add the callback to the array
  },
});

export default eventBusGraphData;