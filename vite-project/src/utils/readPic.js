import axios from "axios"

const picReader = axios.create({
    baseURL: 'http://127.0.0.1:3007/public', 
    headers: {
        'Content-Type': 'application/json'
    }
})

picReader.interceptors.request.use((config) => {
  
  }, (error) => {
    return Promise.reject(error);
});


picReader.interceptors.response.use((response) => {

  }, (error) => {
    return Promise.reject(error);
  
});

export { picReader }