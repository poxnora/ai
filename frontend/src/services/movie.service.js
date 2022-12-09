import http from "../http-common";

class MovieDataService {
    getAll(params) {
        return http.get("/movies", {params});
    }

    get(id) {
        return http.get(`/movies/${id}`);
    }

    create(data) {
        return http.post("/movies", data);
    }

    update(id, data) {
        return http.patch(`/movies/${id}`, data);
    }

    delete(id) {
        return http.delete(`/movies/${id}`);
    }

}

export default new MovieDataService();