import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class API {
  async getMoMDetails(token) {

    try {
      const response = await axios.get('/api/mom',
      {
        headers: {
          "Authorization": "Token " + token
        }
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": error.response.data}
    }

  }

  async putMoM(uuid, token, body) {

    try {
      const response = await axios.put('/api/mom/' + uuid,
      body,
      {
        headers: {
          "Authorization": "Token " + token
        },
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": error.response.data}
    }

  }

  async addMoM(token, body) {

    try {
      const response = await axios.put('/api/mom',
      body,
      {
        headers: {
          "Authorization": "Token " + token
        },
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": error.response.data}
    }

  }

  async deleteMoM(uuid, token) {

    try {
      const response = await axios.delete('/api/mom/' + uuid,
      {
        headers: {
          "Authorization": "Token " + token
        },
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": error.response.data}
    }

  }

}

export default API;