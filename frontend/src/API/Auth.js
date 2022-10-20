import axios from 'axios';


class API {

  async login(email, password) {

    try {
      const response = await axios.post('/api/user/login', {
        "email": email,
        "password": password
      });

      return { "code": response.status, "data": response.data };

    } catch (error) {
      return { "code": error.response.status, "data": error.response.data }
    }

  }

  async createUser(token, body) {
    try {
      const response = await axios.post('/api/user/register',
        body,
        {
          headers: {
            "Authorization": "Token " + token
          },
        });

      return { "code": response.status, "data": response.data };

    } catch (error) {
      return { "code": error.response.status, "data": error.response.data }
    }


  }

}

export default API;