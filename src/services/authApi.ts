import { User } from "@/lib/types";
import { axiosInstance as axios } from "@/lib/utils";
import { AxiosError } from "axios";

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface changePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/v1/auth/me");

    return response.data.data.user as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Please login to continue.");
    }
  }
};

export const login = async ({ email, password }: LoginParams) => {
  try {
    const response = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data.data.user as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to login. Please try again later.");
    }
  }
};

export const signUp = async ({ username, email, password }: SignupParams) => {
  try {
    const response = await axios.post("/api/v1/auth/signup", {
      username,
      email,
      password,
    });

    return response.data.data.user as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to signup. Please try again later.");
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.get("/api/v1/auth/logout");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to logout. Please try again later.");
    }
  }
};
