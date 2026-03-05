import { axiosInstance } from "@/lib/axios";
import type { TLoginSchema } from "@/modules/user/zod-schemas/login-user.schema";
import type { TSignupSchema } from "@/modules/user/zod-schemas/signup-user.schema";

const UserUrls = {
  login: "/user/login",
  signup: "/user",
};

export const login = async (data: TLoginSchema) => {
  try {
    const response = await axiosInstance.post(UserUrls.login, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signup = async (data: TSignupSchema) => {
  try {
    const response = await axiosInstance.post(UserUrls.signup, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
