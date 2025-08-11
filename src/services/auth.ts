import axiosClient from "./apiClient"

const Cal_login = async (email: string | "" , password: string| "") => {
  return await  axiosClient.post("/auth/token",{
    email,password
  })
}
const logout = () => {
  localStorage.removeItem('auth_token'); // Xóa token khỏi localStorage
};
export { Cal_login }