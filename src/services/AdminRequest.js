import AxiosAdmin from "@/services/AxiosAdmin";

export default {
  updateSocietyFaculty(data) {
    return AxiosAdmin().put("/update-society-faculty", data);
  },
  register(data) {
    return AxiosAdmin().post("/society-faculty-register", data);
  },
  userbyId(data) {
    return AxiosAdmin().get("/userbyId", data);
  },
  createEvent(data) {
    return AxiosAdmin().post("/create-event", data);
  },
  editEvent(data) {
    return AxiosAdmin().put("/edit-event", data);
  },
  status() {
    return AxiosAdmin().get("/status");
  },
  addVenue(data) {
    return AxiosAdmin().post("/add-venue", data);
  },
  getHead() {
    return AxiosAdmin().get("get-head");
  },
  ValidateUsername(data) {
    return AxiosAdmin().get("valid-username", data);
  },
  ValidateEmail(data) {
    return AxiosAdmin().get("valid-email", data);
  },
  getAllUsers() {
    return AxiosAdmin().get("getAllUsers");
  },
  replaceFaculty(data) {
    return AxiosAdmin().put("/replace-faculty", data);
  },
  removeUser(data){
    return AxiosAdmin().put("/remove-user", data);
  }
};
