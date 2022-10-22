import { useState } from "react";

import API from "../API/User";
import useUserStore from "../storages/AuthStore";


export default function useUser() {

  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const apiObject = new API();
  const { token } = useUserStore();

  return {

    loading, addLoading, deleteLoading,

    async getUser() {
      setLoading(true);
      const response = await apiObject.getUserDetails(token);
      setLoading(false);

      return response;
    },

    async getUserSimple() {
      setLoading(true);
      const response = await apiObject.getUserSimpleDetails(token);
      setLoading(false);

      return response;
    },

    async putUser(uuid, body) {
      setAddLoading(true);
      const response = await apiObject.putUser(uuid, token, body);
      setAddLoading(false);

      return response;
    },

    async deleteUser(uuid) {
      setDeleteLoading(true);
      const response = await apiObject.deleteUser(uuid, token);
      setDeleteLoading(false);

      return response;
    },

  };
}
