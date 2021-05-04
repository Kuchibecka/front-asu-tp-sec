import axios from "axios";
import ObjectService from "./ObjectService";

const SCHEME_REST_API_URL = 'http://localhost:8081/api/scheme/'

class SchemeService {
    async create(data) {
        return await axios.post(SCHEME_REST_API_URL, data);
    }

    async getAll() {
        return await axios.get(SCHEME_REST_API_URL);
    }

    async getById(id) {
        return await axios.get(SCHEME_REST_API_URL + id);
    }

    async update(scheme, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/edit/', scheme);
    }

    async delete(id) {
        return await axios.delete(SCHEME_REST_API_URL + id + '/delete/');
    }

    addObject(object, id) {
        console.log("Object in addObject(): ", object)
        return axios.put(SCHEME_REST_API_URL + id + '/add_object/', object);
    }

    async addVirus(virus_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/add_virus/' + virus_id);
    }

    async addSecuritySW(securitySW_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/add_securitysw/' + securitySW_id);
    }

    async addCriteriaObject(criteriaObject_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/add_criteria_object/' + criteriaObject_id);
    }

    async removeObject(object_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_object/' + object_id);
    }

    async removeVirus(virus_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_virus/' + virus_id);
    }

    async removeSecuritySW(securitySW_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_securitysw/' + securitySW_id);
    }

    async removeCriteriaObject(criteriaObject_id, id) {
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_criteria_object/' + criteriaObject_id);
    }
}

export default new SchemeService();