<template>
    <form @submit.prevent="submit">
        <v-select variant="outlined" v-model="scenario.value.value" :items="scenarios"
            :error-messages="scenario.errorMessage.value" label="Selected Scenario"></v-select>

        <v-text-field variant="outlined" v-model.number="maxAmplitude.value.value"
            :error-messages="maxAmplitude.errorMessage.value" type="text" label="Max Amplitude" placeholder="70"
            suffix="mmHg"></v-text-field>

        <v-text-field variant="outlined" v-model.number="contractionDuration.value.value"
            :error-messages="contractionDuration.errorMessage.value" type="text" label="Contraction Duration" placeholder="60"
            suffix="s"></v-text-field>

        <v-text-field variant="outlined" v-model="nCycleMax.value.value" :counter="10"
            :error-messages="nCycleMax.errorMessage.value" label="NCycleMax"></v-text-field>

        <v-text-field variant="outlined" v-model="bloodVolumeFetus.value.value" :counter="7"
            :error-messages="bloodVolumeFetus.errorMessage.value" label="Blood Volume Fetus"></v-text-field>

        <v-text-field variant="outlined" v-model="extraOxygen.value.value" :error-messages="extraOxygen.errorMessage.value"
            label="Extra Oxygen"></v-text-field>

        <v-select variant="outlined" v-model="select.value.value" :items="umbilicalOptions"
            :error-messages="select.errorMessage.value" label="Umbilical Options"></v-select>

        <v-checkbox variant="outlined" v-model="checkbox.value.value" :error-messages="checkbox.errorMessage.value"
            value="Option 1" label="Option" type="checkbox"></v-checkbox>

        <v-btn variant="outlined" class="me-4" type="submit">
            submit
        </v-btn>

        <v-btn variant="outlined" @click="handleReset">
            clear
        </v-btn>
    </form>
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

                nCycleMax(value: string) {
                    if (value?.length >= 2) return true

                    return 'NCycleMax needs to be at least 2 characters.'
                },
                bloodVolumeFetus(value: string) {
                    if (value?.length > 9 && /[0-9-]+/.test(value)) return true

                    return 'Blood volume (fetus) needs to be at least 9 digits.'
                },
                extraOxygen(value: string) {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

                    return 'Must be a valid e-mail.'
                },
                select(value: string) {
                    if (value) return true

                    return 'Must select an umbilical option.'
                },
                checkbox(value: string) {
                    if (value === '1') return true

                    return 'Must be checked.'
                },
            },
        })

        const scenario = useField('scenario')
        const maxAmplitude = useField('maxAmplitude') // mmHg
        const contractionDuration = useField('contractionDuration') // seconds

        const nCycleMax = useField('nCycleMax') // heartbeats of mother measured
        const bloodVolumeFetus = useField('bloodVolumeFetus')
        const extraOxygen = useField('extraOxygen') // can be done in oxygen4 as scenario>4
        const select = useField('select') // umbilical options; 2 makes more calculations
        const checkbox = useField('checkbox')

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

        return { scenario, scenarios, contractionDuration, maxAmplitude, nCycleMax, bloodVolumeFetus, extraOxygen, select, checkbox, umbilicalOptions, submit, handleReset }
    },
}
</script>