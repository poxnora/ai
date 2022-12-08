import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/actors");
  }

  get(id) {
    return http.get(`/actors/${id}`);
  }

  create(data) {
    return http.post("/actors", data);
  }

  update(id, data) {
    return http.patch(`/actors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/actors/${id}`);
  }

}

export default new TutorialDataService();