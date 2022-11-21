import axios from 'axios';


class API {
  async downloadFile(token, uuid, resource) {

    let responseData = 404;
    let fileName = ({ 'mom': 'MoM' })[resource]

    try {
      await axios({
        url: '/api/actions/' + resource + '/' + uuid, //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {

        // create file link in browser's memory
        responseData = response.status
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName + '.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);

        return { "code": responseData };
      }).finally((response) => {
        console.log(responseData)
      });
    }
    catch (e) {
      console.log("Error from server");
    }

    return { "code": responseData };
  }

}

export default API;