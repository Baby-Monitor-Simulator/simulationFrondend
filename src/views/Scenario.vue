<!-- Scenario.vue -->
<template>
  <div class="scenarios-container">
    <div class="header-container">
      <h1>{{ translations.scenario.value.title }}</h1>
      <v-btn
        color="primary"
        icon="mdi-plus"
        size="large"
        @click="goToCreateScenario"
        class="create-btn"
      >
      </v-btn>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      {{ translations.common.value.loading }}
    </div>

    <!-- Error state -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Scenarios grid -->
    <div v-if="!loading && !error" class="scenarios-grid">
      <v-card
        v-for="scenario in scenarios"
        :key="scenario._id"
        class="scenario-block"
        @click="goToScenarioDetail(scenario._id)"
        elevation="2"
        hover
      >
        <v-card-title>{{ scenario.name }}</v-card-title>
        <v-card-text>
          <p>{{ scenario.description }}</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useTranslations } from "@/composables/useTranslations";

export default {
  name: "Scenario",
  data() {
    return {
      scenarios: [],
      loading: true,
      error: null,
      translations: useTranslations(),
    };
  },
  created() {
    this.fetchScenarios();
  },
  methods: {
    async fetchScenarios() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_SCENARIO}/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.scenarios = response.data;
        this.loading = false;
      } catch (err) {
        this.error = this.translations.scenario.value.errors.loadFailed;
        this.loading = false;
        console.error("Error:", err);
      }
    },
    goToScenarioDetail(scenarioId) {
      this.$router.push(`/scenario/${scenarioId}`);
    },
    goToCreateScenario() {
      this.$router.push("/scenario/create");
    },
  },
};
</script>

<style scoped>
.scenarios-container {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.scenario-block {
  cursor: pointer;
  transition: transform 0.2s;
}

.scenario-block:hover {
  transform: translateY(-5px);
}

.loading,
.error {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
}
</style>
