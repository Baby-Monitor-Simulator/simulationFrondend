<!-- CreateScenario.vue -->
<template>
  <div class="create-scenario-container">
    <v-form @submit.prevent="saveScenario">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>Nieuw Scenario Aanmaken</h1>
          </v-col>

          <v-col cols="12">
            <v-text-field
                v-model="scenario.name"
                label="Scenario Naam"
                required
                :rules="[v => !!v || 'Naam is verplicht']"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
                v-model="scenario.description"
                label="Beschrijving"
                rows="3"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <h3>MATLAB Instellingen</h3>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model="scenario.Matlab.heartRate"
                label="Heart Rate (Hz)"
                type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model="scenario.Matlab.oxygenSaturation"
                label="Oxygen Saturation"
                type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model="scenario.Matlab.bloodPressure"
                label="Blood Pressure"
                type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn
                color="primary"
                type="submit"
                :loading="saving"
                block
            >
              Scenario Opslaan
            </v-btn>
          </v-col>

          <v-col cols="12">
            <v-btn
                color="secondary"
                @click="$router.push('/scenario')"
                variant="outlined"
                block
            >
              Annuleren
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateScenario',
  data() {
    return {
      scenario: {
        name: '',
        description: '',
        Matlab: {
          oxygenSaturation: null,
          bloodPressure: null,
          heartRate: null,
        }
      },
      saving: false
    }
  },
  methods: {
    async saveScenario() {
      if (!this.scenario.name) {
        alert('Scenario naam is verplicht');
        return;
      }

      this.saving = true;
      try {
        const response = await axios.post('http://localhost:8080/api/scenario', this.scenario);

        this.$router.push('/scenario');
      } catch (error) {
        console.error('Fout bij opslaan scenario:', error);
        alert('Er is een fout opgetreden bij het opslaan van het scenario');
      } finally {
        this.saving = false;
      }
    }
  }
}
</script>

<style scoped>
.create-scenario-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>