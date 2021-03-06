import axios from "axios";

const OBJECT_REST_API_URL = 'http://localhost:8081/api/object/'

class ObjectService {
    async create(data) {
        return await axios.post(OBJECT_REST_API_URL, data)
    }

    async getAll() {
        return await axios.get(OBJECT_REST_API_URL);
    }

    async getById(id) {
        return await axios.get(OBJECT_REST_API_URL + id);
    }

    async update(object, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/edit/', object);
    }

    async delete(id) {
        return await axios.delete(OBJECT_REST_API_URL + id + '/delete/')
    }

    async addVirus(virus, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/add_virus/', virus);
    }

    async addSecuritySW(securitySW, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/add_securitysw/', securitySW);
    }

    async addObject(object, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/add_object/', object);
    }

    async addCriteriaObject(criteriaObject, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/add_criteria_object/', criteriaObject);
    }

    async removeVirus(virus_id, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_virus/' + virus_id);
    }

    async removeSecuritySW(securitySW_id, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_securitysw/' + securitySW_id);
    }

    async removeObject(object_id, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_object/' + object_id);
    }

    async removeCriteriaObject(criteriaObject_id, id) {
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_criteria_object/' + criteriaObject_id);
    }

    async newInstance(id) {
        return await axios.post(OBJECT_REST_API_URL + 'new_instance/' + id);
    }
}

export default new ObjectService();