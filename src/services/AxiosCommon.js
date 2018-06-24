import axios from "axios";

const AxiosCommon = function () {
  return axios.create({
    // http://localhost:3000
    baseURL: `http://localhost:3000/`,

    headers: {
      Authorization: `${localStorage.getItem("token")}`

    }
  });
};
export default AxiosCommon
