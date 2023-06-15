<template>
    <v-form @submit.prevent="submit">
        <div class="form-input">
            <v-select variant="outlined" v-model="scenario.value.value" :items="scenarios"
                :error-messages="scenario.errorMessage.value" :label="selectedScenario"></v-select>
        </div>
        <!-- <div class="form-input">
            <v-select variant="outlined" v-model="umbilicalOption.value.value" :items="umbilicalOptions"
            :error-messages="umbilicalOption.errorMessage.value" label="Umbilical Options"></v-select>
        </div> -->
        <div class="form-input">
            <v-text-field variant="outlined" v-model.number="maxAmplitude.value.value"
                :error-messages="maxAmplitude.errorMessage.value" label="Max Contraction Amplitude" placeholder="70"
                suffix="mmHg"></v-text-field>
        </div>
        <div class="form-input">
            <v-text-field variant="outlined" v-model.number="contractionDuration.value.value"
                :error-messages="contractionDuration.errorMessage.value" label="Contraction Duration" placeholder="60"
                suffix="s"></v-text-field>
        </div>
        <div class="form-input">
            <v-text-field variant="outlined" v-model.number="timeBetweenContractions.value.value"
                :error-messages="timeBetweenContractions.errorMessage.value" label="Time Between Contractions"
                placeholder="180" suffix="s"></v-text-field>
        </div>
        <!-- <v-text-field variant="outlined" v-model.number="nCycleMax.value.value"
            :error-messages="nCycleMax.errorMessage.value" label="NCycleMax" placeholder="??"></v-text-field>

        <v-text-field variant="outlined" v-model.number="bloodVolumeFetus.value.value"
            :error-messages="bloodVolumeFetus.errorMessage.value" label="Blood Volume Fetus"
            placeholder="330"></v-text-field>

        <v-text-field variant="outlined" v-model.number="extraOxygen.value.value"
            :error-messages="extraOxygen.errorMessage.value" label="Extra Oxygen" placeholder="??"></v-text-field> -->
        <div class="form-buttons">
            <v-sheet class="ma-1 pa-2">
                <v-btn block variant="outlined" class="me-4" type="submit">
                    {{ $t("message.submit") }}
                </v-btn>
            </v-sheet>
            <v-divider></v-divider>

            <v-sheet class="ma-1 pa-2">
                <v-btn block variant="outlined" @click="handleReset">
                    {{ $t("message.clear") }}
                </v-btn>
            </v-sheet>
            <!-- 
            <v-sheet class="ma-1 pa-2">
                <v-btn block variant="outlined" @click="resetGraphs">
                    {{ $t("message.reset") }}
                </v-btn>
            </v-sheet> -->
        </div>
        <v-sheet class="ma-1 pa-2">
            <div class="form-input">
                <v-select variant="outlined" v-model="template.value.value" :items="scenarios"
                    :error-messages="template.errorMessage.value" :label="selectedTemplate"></v-select>
            </div>
        </v-sheet>
    </v-form>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import scenarioOption from '@/enums/scenarioOptions'
import { useI18n } from 'vue-i18n'
import { useImportStore } from '@/stores/import';
import { useRouter } from 'vue-router'

export default {
    setup() {
        const importStore: any = useImportStore()
        const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
        const router = useRouter()

        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                scenario(value: string) {
                    return value ? true : 'Must select a scenario.'
                },
                template(value: string) {
                    return value ? true : 'Must select a template.'
                },
                maxAmplitude(value: number) {
                    return value > 0 && value < 120 ? true : errStrs.value.maxAmplitude
                },
                contractionDuration(value: number) {
                    return value > 30 && value < 150 ? true : errStrs.value.contractionDuration
                },
                timeBetweenContractions(value: number) {
                    return value > 0 && value < 600 ? true : errStrs.value.timeBetweenContractions
                },
                nCycleMax(value: number) {
                    return value > 0 ? true : 'Number of cycles must be larger than 0.'
                },
                bloodVolumeFetus(value: number) {
                    return value > 0 ? true : 'Blood volume (fetus) must be larger than 0.'
                },
                extraOxygen(value: number) {
                    return value > 0 ? true : 'Extra oxygen must be larger than 0.'
                },
                umbilicalOption(value: string) {
                    if (value) return true

                    return 'Must select an umbilical option.'
                },
            },
        })

        const scenario = useField('scenario')
        const template = useField('template')
        const maxAmplitude = useField('maxAmplitude') // mmHg
        const contractionDuration = useField('contractionDuration') // seconds
        const timeBetweenContractions = useField('timeBetweenContractions') // seconds
        const nCycleMax = useField('nCycleMax') // heartbeats of mother measured
        const bloodVolumeFetus = useField('bloodVolumeFetus')
        const extraOxygen = useField('extraOxygen') // can be done in oxygen4 as scenario>4
        const umbilicalOption = useField('umbilicalOption') // umbilical options; 2 makes more calculations

        const scenarios = ref([
            scenarioOption.Normal,
            scenarioOption.EarlyDeceleration,
            scenarioOption.LateDeceleration,
            scenarioOption.VarDeceleration // requires umbilical 2
        ])

        const umbilicalOptions = ref([
            'Option 1',
            'Option 2',
        ])

        const submit = handleSubmit((values: string[]) => {
            alert(JSON.stringify(values, null, 2))
        })

        const selectedScenario = computed(() => {
            return t("message.selectedScenario")
        })

        const selectedTemplate = computed(() => {
            return t("message.selectedTemplate")
        })

        const errStrs = computed(() => {
            return {
                scenario: t("message.scenario"),
                template: t("message.template"),
                maxAmplitude: t("message.maxAmplitude") + " 0-120",
                contractionDuration: t("message.maxAmplitude") + " 30-150s",
                timeBetweenContractions: t("message.maxAmplitude") + " 0-600s",
            }
        })

        const resetGraphs = () => {
            router.go(0)
            importStore.clearAll()
        }

        return {
            resetGraphs, template, scenario, scenarios, contractionDuration, timeBetweenContractions, maxAmplitude,
            umbilicalOption, nCycleMax, bloodVolumeFetus, extraOxygen, umbilicalOptions, submit, handleReset, selectedScenario,
            selectedTemplate
        }
    },
    mounted() {
        this.scenario.value.value = scenarioOption.VarDeceleration
        this.maxAmplitude.value.value = 70
        this.contractionDuration.value.value = 60
        this.timeBetweenContractions.value.value = 180
    }
}
</script>
<style>
.form-input {
    max-width: 240px;
    margin-left: 7px;
    margin-bottom: 20px;
}
</style>