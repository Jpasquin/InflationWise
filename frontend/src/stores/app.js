import { defineStore } from 'pinia';
import axios from 'axios';

export const useAppStore = defineStore('appStore', {
  state: () => ({
  }),
  actions: {
    testMethod () {
      console.log('working')
    },
    async testApi () {
      try {
        const response = await axios.get('https://inflation-wise-backend.onrender.com/test');
        console.log(response.data); // 'working'
        return response.data; // Return the response data
      } catch (error) {
        console.error('Error making GET request:', error);
      }
    },
    async onCreateAnalysis (data) {
      console.log(data)
      try {
        const response = await axios.post('https://inflation-wise-backend.onrender.com/createAnalysis', data);
        return response.data;
      } catch (error) {
        console.error('There was an error with the Axios operation:', error);
      }
    }
  },
});
