import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://absolute-chicken-wsa-server-a1ecd4e0.koyeb.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data directly if successful
    return response;
  },
  (error) => {
    // Handle errors here
    if (error.response) {
      // Handle specific status codes if necessary
      if (error.response.status === 401) {
        // Example: Handle unauthorized error (though authentication is not yet implemented)
        alert('You are not authorized!');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
      alert('No response received from the server');
    } else {
      // Something else happened while setting up the request
      console.error('General error:', error.message);
    }
    return Promise.reject(error); // Continue the promise chain with error
  }
);

export default axiosInstance;
