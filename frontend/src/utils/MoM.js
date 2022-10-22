import { useState } from "react";

import API from "../API/MoM"
import useUserStore from "../storages/AuthStore";


export default function useMoM() {

  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const apiObject = new API();
  const { token } = useUserStore();

  return {

    loading, addLoading, deleteLoading, 

    async getMoM() {
      setLoading(true);
      const response = await apiObject.getMoMDetails(token);
      setLoading(false);

      return response;
    },

    async putMoM(uid, body) {
      setAddLoading(true);
      const response = await apiObject.putMoM(uid, token, body);
      setAddLoading(false);

      return response;
    },

    async addMoM(body) {
      setAddLoading(true);
      const response = await apiObject.addMoM(token, body);
      setAddLoading(false);

      return response;
    },
    
    async deleteMoM(uid) {
      setDeleteLoading(true);
      const response = await apiObject.deleteMoM(uid, token);
      setDeleteLoading(false);

      return response;
    },
        

  };
}
