import AxiosSociety from "@/services/AxiosSociety";

export default {
  gethead() {
    return AxiosSociety().get("get-head");
  },
  eventsAvailability(data) {
    return AxiosSociety().post("check-event", data);
  },
  createEvent(data) {
    return AxiosSociety().post("create-event", data);
  },
  editEvent(data) {
    return AxiosSociety().put("edit-event", data);
  },
  status() {
    return AxiosSociety().get("status");
  },
  getEventById(data) {
    return AxiosSociety().put("get-event-byId", data);
  }
};
