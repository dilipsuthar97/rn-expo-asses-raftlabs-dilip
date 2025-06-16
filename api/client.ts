import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

export default client;
