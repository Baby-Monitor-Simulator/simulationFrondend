<template>
    <div>
        <h1>Result</h1>
        <pre>{{ result }}</pre>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ResultDetail",
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
    },
    methods: {
        async getResult() {
            try {
                const response = await axios.get(`http://localhost:8085/result/${this.sessionId}`,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                });
                this.result = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async addResult() {
            try {
                const response = await axios.post(`http://localhost:8085/result/add`, this.newResult,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                });
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