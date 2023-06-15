<script lang="ts" setup>
import { ref, reactive, computed, type Ref } from 'vue'
import { useImportStore } from '@/stores/import'
import type MatlabFile from "@/interfaces/IExpectedFileContent"
import { useI18n } from 'vue-i18n'
import { useHoverStore } from '@/stores/hover';

const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
const hoverStore: any = useHoverStore()

const docFile: any = ref(null)
const importFile: any = useImportStore()

const file: any = reactive({})
const content: any = ref("")
const loading = ref(false)
const inputHasError = ref(false)

function readGeneralFileInput(): void {
    if (docFile.value.files.length > 0) {
        file.value = docFile.value.files[0];
        readMatlabFile();
    }
}

function readMatlabFile(): void {
    const reader = new FileReader();

    if (file.value.name.includes(".txt")) {
        reader.onload = (res) => {
            content.value = res.target!.result;
        };
        reader.readAsText(file.value);
    }
}

function parseMatLabTxtData(): void {
    loading.value = true
    const pairs = content.value.split("\n")
    const parsedContent: MatlabFile[] = []

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const indexEndOfLeftValue = pair.indexOf("\t")
        const indexEndOfRightValue = pair.length
        const parsedValuesObject = {
            x: Number(pair.substring(0, indexEndOfLeftValue)),
            y: Number(pair.substring((indexEndOfLeftValue + 1), indexEndOfRightValue))
        }
        parsedContent.push(parsedValuesObject)
    }

    // for (let i = 0; i < parsedContent.length; i++) {
    //     const dataPair = parsedContent[i];
    //     console.log(dataPair)
    //     if (!dataPair.x || !dataPair.y) {
    //         resetFileInputField();
    //         inputHasError.value = true
    //         return
    //     }
    // }

    inputHasError.value = false
    importFile.graphData = parsedContent
    console.log(JSON.stringify(parsedContent))
    resetFileInputField();
}

function resetFileInputField(): void { // TODO: Reset String in Field
    content.value = ""
    setTimeout(() => (loading.value = false), 500)
}

const isFileEmpty = computed(() => {
    return content.value.length === 0
})

const fileReader = computed(() => {
    return t("message.fileInput")
})

const errorText = computed(() => {
    return inputHasError.value ? t("message.fileInputErrorText") : ""
})

</script>

<template>
    <v-container>
        <v-row no-gutters>
            <v-sheet class="ma-1 pa-2">
                <v-btn variant="outlined" :disabled="isFileEmpty" :loading="loading" icon="mdi-upload" @click="parseMatLabTxtData()">
                </v-btn>
            </v-sheet>
            <v-sheet class="ma-1 pa-1 file-reader-input">
                <v-file-input :error-messages="errorText" :error="inputHasError" variant="outlined" :disabled="loading"
                    prepend-icon="" ref="docFile" clearable accept=".txt" :label="fileReader"
                    @change="readGeneralFileInput()"></v-file-input>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<style scoped>
.file-reader-input {
    width: 142px
}
</style>