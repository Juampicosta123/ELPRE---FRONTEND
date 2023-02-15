import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const setToken = async (token) => {
  localStorage.setItem("Authorization", `Bearer ${token}`);
};

const logout = async () => {
  localStorage.clear();
};

const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

const isLogged = () => {
  if(localStorage.getItem("Authorites")){
    return true;
  } else {
    return false
  }
}

export default { login, setToken, logout, isLogged };
