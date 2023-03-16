<script lang="ts" setup>
import { ref } from 'vue'
import { useImportStore } from '@/stores/import'
import type MatlabFile from "@/interfaces/IExpectedFileContent"

let file: any = ref({})
let content: any = ref("")
const docFile: any = ref(null)
const importFile: any = useImportStore()


// functions
function readMatlabTxtFile(): void {
    file = docFile.value.files[0];
    const reader = new FileReader();
    if (file.name.includes(".txt")) {
        reader.onload = (res) => {
            content = res.target!.result;
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(file);
    }
}

function parseMatLabTxtData(): void {
    const pairs = content.split("\n")
    const parsedContent: MatlabFile[] = [] 
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const indexEndOfLeftValue = pair.indexOf("\t")
        const indexEndOfRightValue = pair.indexOf("\r")
        const parsedValuesObject = {
            x: Number(pair.substring(0, indexEndOfLeftValue)),
            y: Number(pair.substring((indexEndOfLeftValue + 1), indexEndOfRightValue))
        }
        parsedContent.push(parsedValuesObject)
    }
    importFile.fileContent = parsedContent
}

</script>

<template>
    <v-btn variant="outlined" @click="parseMatLabTxtData">Load File</v-btn>
    <div style="border-style:solid">
        <input type="file" ref="docFile" @change="readMatlabTxtFile()" />
    </div>
</template>