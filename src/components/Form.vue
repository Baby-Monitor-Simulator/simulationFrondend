<template>
    <v-form @submit.prevent="submit">
        <v-select variant="outlined" v-model="scenario.value.value" :items="scenarios"
            :error-messages="scenario.errorMessage.value" label="Selected Scenario"></v-select>

        <v-select variant="outlined" v-model="umbilicalOption.value.value" :items="umbilicalOptions"
            :error-messages="umbilicalOption.errorMessage.value" label="Umbilical Options"></v-select>

        <v-text-field variant="outlined" v-model.number="maxAmplitude.value.value"
            :error-messages="maxAmplitude.errorMessage.value" label="Max Amplitude" placeholder="70"
            suffix="mmHg"></v-text-field>

        <v-text-field variant="outlined" v-model.number="contractionDuration.value.value"
            :error-messages="contractionDuration.errorMessage.value" label="Contraction Duration" placeholder="60"
            suffix="s"></v-text-field>

        <v-text-field variant="outlined" v-model.number="timeBetweenContractions.value.value"
            :error-messages="timeBetweenContractions.errorMessage.value" label="Time Between Contractions" placeholder="180"
            suffix="s"></v-text-field>

        <v-text-field variant="outlined" v-model.number="nCycleMax.value.value"
            :error-messages="nCycleMax.errorMessage.value" label="NCycleMax" placeholder="??"></v-text-field>

        <v-text-field variant="outlined" v-model.number="bloodVolumeFetus.value.value"
            :error-messages="bloodVolumeFetus.errorMessage.value" label="Blood Volume Fetus"
            placeholder="330"></v-text-field>

        <v-text-field variant="outlined" v-model.number="extraOxygen.value.value"
            :error-messages="extraOxygen.errorMessage.value" label="Extra Oxygen" placeholder="??"></v-text-field>

        <v-btn variant="outlined" class="me-4" type="submit">
            submit
        </v-btn>

        <v-btn variant="outlined" @click="handleReset">
            clear
        </v-btn>
    </v-form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import scenarioOption from '@/enums/scenarioOptions'

export default {
    setup() {
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                scenario(value: string) {
                    return value ? true : 'Must select a scenario.'
                },
                maxAmplitude(value: number) {
                    return value > 0 ? true : 'Max amplitude must be larger than 0.'
                },
                contractionDuration(value: number) {
                    return value > 0 ? true : 'Contraction duration must be larger than 0.'
                },
                timeBetweenContractions(value: number) {
                    return value > 0 ? true : 'Time between contractions must be larger than 0.'
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
        const maxAmplitude = useField('maxAmplitude') // mmHg
        const contractionDuration = useField('contractionDuration') // seconds
        const timeBetweenContractions = useField('timeBetweenContractions') // seconds
        const nCycleMax = useField('nCycleMax') // heartbeats of mother measured
        const bloodVolumeFetus = useField('bloodVolumeFetus')
        const extraOxygen = useField('extraOxygen') // can be done in oxygen4 as scenario>4
        const umbilicalOption = useField('umbilicalOption') // umbilical options; 2 makes more calculations

        const scenarios = ref([
            scenarioOption.Normal,
            scenarioOption.EarlyDeclaration,
            scenarioOption.LateDeclaration,
            scenarioOption.VarDeclaration // requires umbilical 2
        ])

        const umbilicalOptions = ref([
            'Option 1',
            'Option 2',
        ])

        const submit = handleSubmit((values: string[]) => {
            alert(JSON.stringify(values, null, 2))
        })

        return { scenario, scenarios, contractionDuration, timeBetweenContractions, maxAmplitude, umbilicalOption, nCycleMax, bloodVolumeFetus, extraOxygen, umbilicalOptions, submit, handleReset }
    },
}
</script>