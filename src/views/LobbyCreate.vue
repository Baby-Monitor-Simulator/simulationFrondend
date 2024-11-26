<template>
  <div class="lobby-container">
    <div class="lobby-form">
      <h1 class="title">Create Lobby</h1>
      <form @submit.prevent="createLobby">
        <div class="form-group">
          <label for="lobby-name">Lobby Name</label>
          <input
            type="text"
            id="lobby-name"
            v-model="lobbyName"
            placeholder="Enter Lobby Name"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password (Optional)</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter Password (Optional)"
          />
        </div>

        <div class="form-group">
          <label for="username">Your Name</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter Your Name"
            required
          />
        </div>

        <button type="submit" class="submit-btn">Create Lobby</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lobbyName: '',
      password: '',
      username: '',
    };
  },
  methods: {
    async createLobby() {
      try {
        const userData=
        {
          username: this.username,
          email: this.email       
        }

        const token: localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_APP_API_LOBBY}`, userData, {
        headers: {
          Authorization: `Bearer ${token}` // Add JWT token in Authorization header
        }});

        if (response.data.success) {
          console.log("lobby has been created");
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
