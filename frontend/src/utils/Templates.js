import { useState } from "react";

import API from "../API/Templates"
import useUserStore from "../storages/AuthStore";


export default function useTemplate() {

  const [downloadLoading, setDownloadLoading] = useState(false);
  
  const apiObject = new API();
  const { token } = useUserStore();

  return {

    downloadLoading,  

    async downloadFile(uuid, resource) {
      setDownloadLoading(true);
      const response = await apiObject.downloadFile(token, uuid, resource);
      setDownloadLoading(false);

      return response;
    },

  }
}