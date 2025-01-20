<template>
    <div class="result-container">
      <div class="header-result">
        <h1>Resultaten</h1>
      </div>
  
      <!-- Loading state -->
      <div v-if="loading" class="loading">
        Loading results...
      </div>
  
      <!-- Error state -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <!-- Scenarios grid -->
      <div v-if="!loading && !error" class="result-grid">
        <v-card
            v-for="result in allResults"
            :key="result.id"
            class="scenario-block"
            @click="goToResultDetail(result.id)"
            elevation="2"
            hover
        >
          <v-card-title>result for session: {{ result.session }}</v-card-title>
          <v-card-text>
            <p>{{ result.simType }}</p>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userId: '',
            sessionId: '',
            allResults: null,
            result: null,
            newResult: {
                userId: '',
                sessionId: '',
                data: ''
            }
        };
    },
    methods: {
        async getAllResults() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_RESULT}/byUser`,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                });
                this.allResults = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        goToScenarioDetail(scenarioId) {
          this.$router.push(`/result/${scenarioId}`);
    },
    }
};
</script>

<style scoped>
.result-container {
  padding: 20px;
}

.header-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.result-block {
  cursor: pointer;
  transition: transform 0.2s;
}

.scenario-block:hover {
  transform: translateY(-5px);
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
}
</style>

<style scoped>
input, textarea {
    display: block;
    margin-bottom: 10px;
}
</style>