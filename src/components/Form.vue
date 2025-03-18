<script lang="ts">
import { ref, watch } from "vue";
import { useField, useForm } from "vee-validate";
import scenarioOption from "@/enums/scenarioOptions";
import templateOptionV2 from "@/enums/templateOptionsV2";
import { useImportStore } from "@/stores/import";
import { useRouter } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import { useHoverStore } from "@/stores/hover";
import { useTranslations } from "@/composables/useTranslations";

// Do need something like this for the change of color when hovering over in the manual, this includes: hovering = useHoverStore(); underneath this (line 21)
//let hovering = undefined;

export default {
  setup() {
    const { form: formTranslations } = useTranslations();
    const importStore: any = useImportStore();
    const globalStore: any = useGlobalStore();
    const router = useRouter();

    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        scenario(value: string) {
          return value ? true : formTranslations.value.scenario;
        },
        template(value: string) {
          return value ? true : formTranslations.value.template;
        },
        maxAmplitude(value: number) {
          return value > 0 && value < 120 ? true : formTranslations.value.maxAmplitude;
        },
        contractionDuration(value: number) {
          return value > 30 && value < 150
            ? true
            : formTranslations.value.contractionDuration;
        },
        timeBetweenContractions(value: number) {
          return value > 0 && value < 600
            ? true
            : formTranslations.value.timeBetweenContractions;
        },
        nCycleMax(value: number) {
          return value > 0 ? true : "Number of cycles must be larger than 0.";
        },
        bloodVolumeFetus(value: number) {
          return value > 0 ? true : "Blood volume (fetus) must be larger than 0.";
        },
        extraOxygen(value: number) {
          return value > 0 ? true : "Extra oxygen must be larger than 0.";
        },
        umbilicalOption(value: string) {
          if (value) return true;

          return "Must select an umbilical option.";
        },
      },
    });

    const scenario = useField("scenario");
    const template = useField("template");
    const maxAmplitude = useField("maxAmplitude"); // mmHg
    const contractionDuration = useField("contractionDuration"); // seconds
    const timeBetweenContractions = useField("timeBetweenContractions"); // seconds
    const nCycleMax = useField("nCycleMax"); // heartbeats of mother measured
    const bloodVolumeFetus = useField("bloodVolumeFetus");
    const extraOxygen = useField("extraOxygen"); // can be done in oxygen4 as scenario>4
    const umbilicalOption = useField("umbilicalOption"); // umbilical options; 2 makes more calculations

    const scenarios = ref([
      scenarioOption.Normal,
      scenarioOption.EarlyDeceleration,
      scenarioOption.LateDeceleration,
      scenarioOption.VarDeceleration, // requires umbilical 2
    ]);

    const templates = ref([
      templateOptionV2.EarlyDecels,
      templateOptionV2.LateDecels,
      templateOptionV2.NormalDecels,
    ]);

    const umbilicalOptions = ref(["Option 1", "Option 2"]);

    const submit = handleSubmit((values: string[]) => {
      alert(JSON.stringify(values, null, 2));
    });

    // watch works directly on a ref
    watch(template.value, (newTemplate, oldTemplate) => {
      if (!oldTemplate) {
        globalStore.haltFetch = false;
      } else {
        globalStore.haltFetch = true;
        importStore.fillGraph(template.value);
        console.log(template.value);
      }
    });

    const resetGraphs = () => {
      router.go(0);
      importStore.clearAll();
    };

    return {
      resetGraphs,
      template,
      scenario,
      scenarios,
      contractionDuration,
      timeBetweenContractions,
      maxAmplitude,
      umbilicalOption,
      nCycleMax,
      bloodVolumeFetus,
      extraOxygen,
      umbilicalOptions,
      submit,
      handleReset,
      templates,
      formTranslations,
    };
  },
  mounted() {
    console.log("Health check passed");
    this.scenario.value.value = scenarioOption.VarDeceleration;
    this.template.value.value = templateOptionV2.None;
    this.maxAmplitude.value.value = 70;
    this.contractionDuration.value.value = 60;
    this.timeBetweenContractions.value.value = 180;
  },
};
</script>
<style>
.form-input {
  max-width: 240px;
  margin-left: 7px;
  margin-bottom: 20px;
}
</style>

<template>
  <v-form @submit.prevent="submit" class="ma-1 pa-2">
    <div class="form-input">
      <v-select
        variant="outlined"
        v-model="scenario.value.value"
        :items="scenarios"
        :error-messages="scenario.errorMessage.value"
        :label="formTranslations.selectedScenario"
      ></v-select>
    </div>
    <!-- <div class="form-input">
                  <v-select variant="outlined" v-model="umbilicalOption.value.value" :items="umbilicalOptions"
                  :error-messages="umbilicalOption.errorMessage.value" label="Umbilical Options"></v-select>
              </div> -->
    <div class="form-input">
      <v-text-field
        variant="outlined"
        v-model.number="maxAmplitude.value.value"
        :error-messages="maxAmplitude.errorMessage.value"
        :label="formTranslations.maxAmplitudeLabel"
        placeholder="70"
        :suffix="formTranslations.mmHg"
      ></v-text-field>
    </div>
    <div class="form-input">
      <v-text-field
        variant="outlined"
        v-model.number="contractionDuration.value.value"
        :error-messages="contractionDuration.errorMessage.value"
        :label="formTranslations.contractionDurationLabel"
        placeholder="60"
        :suffix="formTranslations.seconds"
      ></v-text-field>
    </div>
    <div class="form-input">
      <v-text-field
        variant="outlined"
        v-model.number="timeBetweenContractions.value.value"
        :error-messages="timeBetweenContractions.errorMessage.value"
        :label="formTranslations.timeBetweenContractionsLabel"
        placeholder="180"
        :suffix="formTranslations.seconds"
      ></v-text-field>
    </div>
    <div class="form-buttons">
      <v-sheet class="ma-1 pa-2">
        <!-- v-btn below does need something like     :color="hovering.submit ? '#00FF00' : 'white'"      -->
        <v-btn
          block
          variant="outlined"
          class="me-4"
          type="submit"
          prepend-icon="mdi-send"
        >
          {{ formTranslations.submit }}
        </v-btn>
      </v-sheet>
      <v-divider></v-divider>

      <v-sheet class="ma-1 pa-2">
        <v-btn
          block
          variant="outlined"
          @click="handleReset"
          prepend-icon="mdi-trash-can-outline"
        >
          {{ formTranslations.clear }}
        </v-btn>
      </v-sheet>
    </div>
    <v-sheet class="ma-1 pa-2">
      <div class="form-input">
        <v-select
          variant="outlined"
          v-model="template.value.value"
          :items="templates"
          :error-messages="template.errorMessage.value"
          :label="formTranslations.selectedTemplate"
        ></v-select>
      </div>
    </v-sheet>
  </v-form>
</template>
