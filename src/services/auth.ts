import axiosClient from "./apiClient";
import Cookies from "js-cookie";

interface LoginResponse {
  result?: {
    token: string;
  };
  token?: string;
}

const Cal_login = async (email: string, password: string) => {
  const res = await axiosClient.post<LoginResponse>("/auth/token", {
    email,
    password,
  });

  const token = res.data.result?.token || res.data.token;

  if (token) {
    Cookies.set("authToken", token, { expires: 1 });
  }

  return res;
};

const logout = () => {
  Cookies.remove("authToken");
};

export { Cal_login, logout };
