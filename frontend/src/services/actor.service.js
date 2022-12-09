import http from "../http-common";

class ActorDataService {
    getAll(params) {
        return http.get("/actors", {params});
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

    addActorToMovie(actor_id, movie_id) {
        return http.put(`/actors/${actor_id}/movies/${movie_id}`);
    }

    deleteActorFromMovie(actor_id, movie_id) {
        return http.delete(`/actors/${actor_id}/movies/${movie_id}`);
    }
}

export default new ActorDataService();