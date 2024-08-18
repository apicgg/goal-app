import axios from "axios";
import { API_URL } from "../../constants/apiUrl";
import { User } from "./authSlice";

export type UserDataForRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserDataBodyLogin = {
  name: string;
  email: string;
};

// Register user
const register = async (userData: UserDataForRegister) => {
  try {
    const response = await axios.post<User>(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

// Login user
const login = async (userData: UserDataBodyLogin) => {
  try {
    const response = await axios.post<User>(`${API_URL}/login`, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
