import { ref } from "vue";

// Export the roles ref so it can be watched by components
export const roles = ref<string[]>([]);

// Computed property to check if the user has any of the roles in the given array
export function hasRole(requiredRoles: string[]) {
  // Make sure roles are loaded before checking
  if (roles.value.length === 0) {
    loadRoles();
  }
  return requiredRoles.some((role) => roles.value.includes(role));
}

// Function to decode the JWT and retrieve roles from localStorage
export function loadRoles() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the JWT token and parse the payload
        const payload = JSON.parse(atob(token.split(".")[1]));
        
        // Get all roles from realm_access
        const allRoles = payload.realm_access?.roles || [];
        
        // Filter out system roles and keep only specific roles
        const specificRoles = allRoles.filter((role: string) => 
          ['admin', 'deelnemer', 'instructeur'].includes(role)
        );
        
        // Update the roles ref with only the specific roles
        roles.value = specificRoles;
        return true;
      } catch (error) {
        roles.value = ["error"];
        return false;
      }
    } else {
      roles.value = ["norole"];
      return false;
    }
  } catch (error) {
    roles.value = ["error"];
    return false;
  }
}