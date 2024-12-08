import { defineStore } from 'pinia'
import { ref } from 'vue'

const apiKey = 'AIzaSyCamcC2oou2Sj0NAw0PO7ulyv9Sh6f1La0';

export const useAuthStore = defineStore('auth', () => {
  const signup = async (payload) => {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true,
      });

      console.log(response);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return { signup };
})
