import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'https://zenquotes.io/api/',
  });
  
export default apiClient;
