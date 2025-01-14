<template>
  <div class="lobby-container">
    <div class="lobby-form">
      <h1 class="title">Create Lobby</h1>
      <form @submit.prevent="createLobby">
        <div class="form-group">
          <label for="scenario">Scenario</label>
          <select id="scenario" v-model="scenario" required>
            <option v-for="scenario in scenarios" :key="scenario._id" :value="scenario._id">
              {{ scenario.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-btn">Create Lobby</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      scenario: "",
      scenarios: []
    };
  },
  mounted() {
    this.fetchScenarios();
  },
  methods: {
    async fetchScenarios() {
      console.log("Fetching the scenarios")
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${import.meta.env.VITE_APP_API_SCENARIO}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        this.scenarios = response.data;
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      }
    },
    async createLobby() {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${import.meta.env.VITE_APP_API_LOBBY}/NewLobby`, 
        {scenarioid: this.scenario}, {
        headers: {
          Authorization: `Bearer ${token}` 
        }});

        console.log(response)
        if (response.status === 200) {
          console.log("lobby has been created, received the following data", response.data);
          const lobbyId = response.data.lobbyid; // Extract lobbyid from response
          this.$router.push(`/lobby/${lobbyId}`); // Navigate to the new route
        } 
      } catch (error) {
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.lobby-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fc;
  font-family: 'Arial', sans-serif;
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

.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease-in-out;
}

.form-group select:focus {
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
