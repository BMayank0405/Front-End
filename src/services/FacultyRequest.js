import AxiosFaculty from "@/services/AxiosFaculty";

export default {
  pendingEvents() {
    return AxiosFaculty().get("pending-events");
  },
  approve(data) {
    return AxiosFaculty().put("pending-events/approve", data);
  },
  decline(data) {
    return AxiosFaculty().put("pending-events/decline", data);
  },
  history() {
    return AxiosFaculty().get("history");
  },
  historyAccept() {
    return AxiosFaculty().put("history/accept");
  },
  historyReject(data) {
    return AxiosFaculty().put("history/reject", data);
  },
  suggestEdit(data) {
    return AxiosFaculty().put("suggest-edit", data);
  }
};
