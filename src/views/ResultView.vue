<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useTranslations } from "@/composables/useTranslations";

// Translations
const translations = useTranslations();

// Types
interface NewResult {
  sessionId: string;
  data: string;
  simType: string;
}

// Reactive references
const sessionId = ref("");
const allResults = ref(null);
const result = ref(null);
const error = ref(null);
const loading = ref(false);
const newResult = ref<NewResult>({
  sessionId: "",
  data: "",
  simType: "",
});

const router = useRouter();

// Computed
const userId = computed(() => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return payload.sub || payload.user_id;
  } catch (e) {
    console.error("Error parsing token:", e);
    return null;
  }
});

// Methods
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getAllResults = async () => {
  if (!userId.value) {
    error.value = translations.results.value.errors.loadFailed as any;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_RESULT}/byUser`,
      getAuthConfig()
    );
    allResults.value = response.data;
  } catch (err: any) {
    error.value = (err.response?.data?.message ||
      translations.results.value.errors.loadFailed) as any;
    console.error("Error fetching results:", err);
  } finally {
    loading.value = false;
  }
};

const getResult = async () => {
  if (!userId.value || !sessionId.value) {
    error.value = translations.results.value.errors.loadFailed as any;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_RESULT}${sessionId.value}`,
      getAuthConfig()
    );
    result.value = response.data;
  } catch (err: any) {
    error.value = (err.response?.data?.message ||
      translations.results.value.errors.loadFailed) as any;
    console.error("Error fetching result:", err);
  } finally {
    loading.value = false;
  }
};

const addResult = async () => {
  if (!userId.value) {
    error.value = translations.results.value.errors.loadFailed as any;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const resultData = {
      ...newResult.value,
      userId: userId.value,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_RESULT}/add`,
      resultData,
      getAuthConfig()
    );

    console.log("Result added:", response.data);
    // Clear form after successful submission
    newResult.value = {
      sessionId: "",
      data: "",
      simType: "",
    };
    // Refresh results list
    await getAllResults();
  } catch (err: any) {
    error.value = (err.response?.data?.message ||
      translations.results.value.errors.loadFailed) as any;
    console.error("Error adding result:", err);
  } finally {
    loading.value = false;
  }
};

// Lifecycle hooks
onMounted(async () => {
  try {
    getAuthConfig(); // Verify token exists
    await getAllResults(); // Load initial data
  } catch (err: any) {
    error.value = err.message;
    router.push("/login");
  }
});
</script>

<template>
  <div class="result-view-container p-4">
    <!-- Error Messages -->
    <div v-if="error" class="error-message mb-4 p-3 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="loading-message mb-4 p-3 bg-blue-100 text-blue-700 rounded"
    >
      {{ translations.common.value.loading }}
    </div>

    <h1 class="text-2xl font-bold mb-6">{{ translations.results.value.title }}</h1>

    <!-- Results List Section -->
    <section class="results-list mb-8 p-4 border rounded">
      <h2 class="text-xl font-semibold mb-4">{{ translations.results.value.title }}</h2>
      <div v-if="allResults">
        <h3 class="font-medium mb-2">{{ translations.results.value.title }}:</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto">{{ allResults }}</pre>
      </div>
      <div v-else class="no-results">
        {{ translations.results.value.noResults }}
      </div>
    </section>

    <!-- Single Result Section -->
    <section class="single-result mb-8 p-4 border rounded">
      <h2 class="text-xl font-semibold mb-4">
        {{ translations.results.value.detail.title }}
      </h2>
      <div class="form-group">
        <input
          v-model="sessionId"
          placeholder="Enter Session ID"
          class="w-full p-2 mb-3 border rounded"
        />
        <button
          @click="getResult"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          :disabled="loading"
        >
          {{ translations.results.value.view }}
        </button>
      </div>
      <div v-if="result" class="mt-4">
        <h3 class="font-medium mb-2">{{ translations.results.value.detail.title }}:</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto">{{ result }}</pre>
      </div>
    </section>

    <!-- Add Result Form -->
    <section class="add-result p-4 border rounded">
      <h2 class="text-xl font-semibold mb-4">
        {{ translations.common.value.save }} {{ translations.results.value.title }}
      </h2>
      <form @submit.prevent="addResult" class="space-y-4">
        <div class="form-group">
          <input
            v-model="newResult.sessionId"
            placeholder="Enter Session ID"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="form-group">
          <textarea
            v-model="newResult.data"
            placeholder="Enter Result Data"
            required
            class="w-full p-2 border rounded h-32"
          ></textarea>
        </div>
        <div class="form-group">
          <input
            v-model="newResult.simType"
            placeholder="Enter simulation type"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          :disabled="loading"
        >
          {{ translations.common.value.save }}
        </button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.error-message {
  border: 1px solid #f56565;
}

.loading-message {
  border: 1px solid #4299e1;
}
</style>
