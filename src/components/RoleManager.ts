import { ref } from "vue";

// Computed property to check if the user has any of the roles in the given array
export function hasRole (requiredRoles: string[]) {
    loadRoles();
    return requiredRoles.some((role) => roles.value.includes(role));
  };

// onMounted hook to decode the JWT and retrieve roles from localStorage
export function loadRoles () {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the JWT token and parse the payload
        const payload = JSON.parse(atob(token.split(".")[1]));
        roles.value = payload.realm_access?.roles || [];
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("no role");
      roles.value = ["norole"];
    }
  };

  export const roles = ref<string[]>([]);