import { axiosInstance } from "@/lib/axios";
import type { TLoginSchema } from "@/modules/user/zod-schemas/login-user.schema";

const UserUrls = {
  login: "/user/login",
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
