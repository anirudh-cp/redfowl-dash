import axios from 'axios';


class API {
  async getUserDetails(token) {

    try {
      const response = await axios.get('/api/user',
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

  async getUserSimpleDetails(token) {

    try {
      const response = await axios.get('/api/user/simple',
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

  async putUser(uuid, token, body) {

    try {
      const response = await axios.put('/api/user/' + uuid,
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

  async deleteUser(uuid, token) {

    try {
      const response = await axios.delete('/api/user/' + uuid,
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