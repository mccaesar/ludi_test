import http from "../http-common";

class ResourceDataService {
  getAll() {
    return http.get("/resources");
  }

  get(id) {
    return http.get(`/resources/${id}`);
  }

  create(data) {
    return http.post("/resources", data);
  }

  update(id, data) {
    return http.put(`/resources/${id}`, data);
  }

  delete(id) {
    return http.delete(`/resources/${id}`);
  }

  deleteAll() {
    return http.delete(`/resources`);
  }

//   findByTitle(title) {
//     return http.get(`/resources?title=${title}`);
//   }
}

export default new ResourceDataService();