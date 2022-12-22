import http from "../http-common";

class ActorDataService {
    getAll(params) {
        return http.get("/workers", {params});
    }

    get(id) {
        return http.get(`/workers/${id}`);
    }

    create(data) {
        return http.post("/workers", data);
    }

    update(id, data) {
        return http.patch(`/workers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/workers/${id}`);
    }

    addActorToMovie(workers_id, company_id) {
        return http.put(`/workers/${workers_id}workers${company_id}`);
    }

    deleteActorFromMovie(workers_id, company_id) {
        return http.delete(`/workers/${workers_id}/workers/${company_id}`);
    }
}

export default new ActorDataService();