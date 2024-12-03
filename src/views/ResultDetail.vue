<template>
    <div>
        <h1>Result</h1>
        <div>
            <h2>Get All Results by User ID</h2>
            <input v-model="userId" placeholder="Enter User ID" />
            <button @click="getAllResults">Get All Results</button>
            <div v-if="allResults">
                <h3>Results:</h3>
                <pre>{{ allResults }}</pre>
            </div>
        </div>
        <div>
            <h2>Get Specific Result by User ID and Session ID</h2>
            <input v-model="userId" placeholder="Enter User ID" />
            <input v-model="sessionId" placeholder="Enter Session ID" />
            <button @click="getResult">Get Result</button>
            <div v-if="result">
                <h3>Result:</h3>
                <pre>{{ result }}</pre>
            </div>
        </div>
        <div>
            <h2>Add Result</h2>
            <input v-model="newResult.userId" placeholder="Enter User ID" />
            <input v-model="newResult.sessionId" placeholder="Enter Session ID" />
            <textarea v-model="newResult.data" placeholder="Enter Result Data"></textarea>
            <button @click="addResult">Add Result</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ResultDetail"
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
    created() {
        this.getResult()
    }
    methods: {
        async getResult() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_RESULTS}${this.userId}/${this.sessionId}`);
                this.result = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async addResult() {
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_API_RESULTS}`, this.newResult);
                console.log('Result added:', response.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style scoped>
input, textarea {
    display: block;
    margin-bottom: 10px;
}
</style>