import { PageParams, User } from "@/lib/types";
import { axiosInstance as axios } from "@/lib/utils";
import { AxiosError } from "axios";

export interface updateUserDetailsParams {
  email?: string;
  username?: string;
}

export const getAllUsers = async ({ search, page, size }: PageParams) => {
  try {
    const response = await axios.get("/api/v1/users", {
      params: {
        search,
        page,
        limit: size,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to fetch all users.");
    }
  }
};

export const getAllUnknownUsers = async ({
  search,
  page,
  size,
}: PageParams) => {
  try {
    const response = await axios.get("/api/v1/users/unknown", {
      params: {
        search,
        page,
        limit: size,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to fetch unknown users.");
    }
  }
};

export const updateUserDetails = async (user: User) => {
  try {
    const response = await axios.patch("/api/v1/users/updateUserDetails", user);

    return response.data.data.user as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to change your details. Please try again later.");
    }
  }
};

export const uploadAvatar = async ({ avatar }: { avatar: File }) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  try {
    const response = await axios.patch("/api/v1/users/uploadAvatar", formData);

    return response.data.data.user as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message as string;
      if (message) throw new Error(message);

      throw new Error("Unable to upload your avatar. Please try again later.");
    }
  }
};
