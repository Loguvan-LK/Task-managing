import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/auth';

// Login request
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { username: email, password });
  return response.data; // token and user
};

// Register request
export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};
