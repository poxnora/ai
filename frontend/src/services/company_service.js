import http from "../http-common";

class MovieDataService {
    getAll(params) {
        return http.get("/company", {params});
    }

    get(id) {
        return http.get(`/companies/${id}`);
    }

    create(data) {
        return http.post("/companies", data);
    }

    update(id, data) {
        return http.patch(`/companies/${id}`, data);
    }

    delete(id) {
        return http.delete(`/companies/${id}`);
    }

}

export default new MovieDataService();