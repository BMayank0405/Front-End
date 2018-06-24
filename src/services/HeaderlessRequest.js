import Headerless from "./Headerless";

export default {
  login(credentials) {
    return Headerless().post("login", credentials);
  },
  getSocieties() {
    return Headerless().get("all-societies");

  },
  forgotPassword(data) {
    return Headerless().post("forgot-password", data);
  },
  getEvent() {
    return Headerless().get("get-event");
  }
};
