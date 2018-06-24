import AxiosCommon from "@/services/AxiosCommon";

const CommonRequest = {
  validateUser() {
    return AxiosCommon().get("validate-user");
  },
  changePassword(data) {
    return AxiosCommon().put("change-password", data);
  },
  getVenues() {
    return AxiosCommon().get("all-venues");
  }
};

export default CommonRequest;
