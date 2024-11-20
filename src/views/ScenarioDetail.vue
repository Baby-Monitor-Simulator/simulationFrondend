<!-- ScenarioDetail.vue -->
<template>
  <div class="scenario-detail">
    <div class="header-container">
      <h1>{{ scenario?.name || 'Scenario Details' }}</h1>
      <v-btn
          color="primary"
          icon="mdi-arrow-left"
          @click="$router.push('/scenario')"
      >
      </v-btn>
    </div>

    <div v-if="loading" class="loading">
      Loading scenario details...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <v-card v-if="!loading && !error" class="Scenario-bescrijving">
      <v-card-title>Beschrijving</v-card-title>
      <v-card-text>
        {{scenario?.description}}
      </v-card-text>
    </v-card>

    <v-card v-if="!loading && !error" class="matlab-settings">
      <v-card-title>MATLAB Instellingen</v-card-title>
      <v-card-text>
        <div v-for="(value, key) in scenario?.matlab" :key="key" class="setting-item">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ScenarioDetail',
  data() {
    return {
      scenario: null,
      loading: true,
      error: null
    }
  },
  created() {
    this.fetchScenarioDetail();
  },
  methods: {
    async fetchScenarioDetail() {
      try {
        const scenarioId = this.$route.params.id;
        const response = await axios.get(`http://localhost:8080/api/scenario/${scenarioId}`);
        this.scenario = response.data;
        this.loading = false;
      } catch (err) {
        this.error = 'Er is een fout opgetreden bij het ophalen van de scenario details';
        this.loading = false;
        console.error('Error:', err);
      }
    }
  }
}
</script>

<style scoped>
.scenario-detail {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.matlab-settings {
  margin-top: 20px;
  padding: 20px;
}

.setting-item {
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
}
</style>