<template>
  <div>
    <h1>{{ translations.results.value.detail.title }}</h1>
    <button @click="goBack" class="back-button">
      {{ translations.results.value.detail.back }}
    </button>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import axios from "axios";
import { useTranslations } from "@/composables/useTranslations";

export default {
  name: "ResultDetail",
  data() {
    return {
      userId: "",
      sessionId: "",
      allResults: null,
      result: null,
      loading: true,
      error: null,
      translations: useTranslations(),
      newResult: {
        userId: "",
        sessionId: "",
        data: "",
      },
    };
  },
  created() {
    this.sessionId = this.$route.params.id;
    this.getResult();
  },
  methods: {
    async getResult() {
      try {
        this.loading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_RESULT}/${this.sessionId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.result = response.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.error = this.translations.results.value.errors.loadFailed;
        this.loading = false;
      }
    },
    goBack() {
      this.$router.push("/result");
    },
    async addResult() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_RESULT}/add`,
          this.newResult,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log("Result added:", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
input,
textarea {
  display: block;
  margin-bottom: 10px;
}

.back-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #3aa876;
}
</style>
