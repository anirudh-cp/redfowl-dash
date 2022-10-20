import { useState, createContext } from "react";

import API from "./../API/Auth"
import useUserStore from "../storages/AuthStore";


export default function useAuth() {

  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  const apiObject = new API();
  const { setToken, UserDeleteEverything, token } = useUserStore();

  return {

    loading, authStatus,

    // Return 
    async login(email, password) {
      setLoading(true);
      const response = await apiObject.login(email, password);
      setLoading(false);

      if (response['code'] === 200)
      {
        setAuthStatus(true);
        setToken(response.data.token);
      }

      return response
    },

    async logout() {
      setLoading(true);
      UserDeleteEverything();
      setLoading(false);
    },

    
    async register(body) {
      setLoading(true);
      const response = await apiObject.createUser(token, body);
      setLoading(false);

      return response;
    },



  };
}
