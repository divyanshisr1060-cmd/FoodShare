// Central API Configuration for FoodShare
// Automatically uses the deployed Render backend or an environment variable override

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://foodshare-backend-8gjm.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  FOOD: {
    BASE: `${API_BASE_URL}/api/food`,
    MY_LISTINGS: `${API_BASE_URL}/api/food/my-listings`,
    MY_CLAIMS: `${API_BASE_URL}/api/food/my-claims`,
    CLAIM: (id) => `${API_BASE_URL}/api/food/${id}/claim`,
    UNCLAIM: (id) => `${API_BASE_URL}/api/food/${id}/unclaim`,
    STATUS: (id) => `${API_BASE_URL}/api/food/${id}/status`,
    BY_ID: (id) => `${API_BASE_URL}/api/food/${id}`,
  },
};
