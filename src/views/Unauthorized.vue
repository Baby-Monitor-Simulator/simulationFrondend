<template>
  <div class="unauthorized-container">
    <div class="unauthorized-card">
      <h1>Unauthorized Access</h1>
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle"></i>
        You don't have permission to access this page.
      </div>

      <p v-if="attemptedPath">
        You were trying to access: <strong>{{ attemptedPath }}</strong>
      </p>

      <div class="actions">
        <button @click="goToHome" class="btn btn-secondary">Go to Home</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UnauthorizedView",
  props: {
    attemptedPath: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push({ name: "home" });
    };

    return {
      goToHome,
    };
  },
});
</script>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.unauthorized-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h1 {
  color: #e74c3c;
  margin-bottom: 20px;
}

.alert {
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}
</style>
