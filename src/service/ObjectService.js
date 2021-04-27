import axios from "axios";
import VirusService from "./VirusService";
import SecuritySWService from "./SecuritySWService";

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

    async deleteObject(id) {
        return await axios.delete(OBJECT_REST_API_URL + id + '/delete/')
    }

    async addVirus(virus_id, id) {
        const virus = await VirusService.getById(virus_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/add_virus/', virus);
    }

    async addSecuritySW(securitySW_id, id) {
        const securitySW = await SecuritySWService.getById(securitySW_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/add_securitysw/', securitySW);
    }

    async addObject(object_id, id) {
        const object = await this.getById(object_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/add_object/', object);
    }

    async addCriteriaObject(criteriaObject_id, id) {
        const criteriaObject = await this.getById(criteriaObject_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/add_criteria_object/', criteriaObject);
    }

    async removeVirus(virus_id, id) {
        const virus = await VirusService.getById(virus_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_virus/', virus);
    }

    async removeSecuritySW(securitySW_id, id) {
        const securitySW = await SecuritySWService.getById(securitySW_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_securitysw/', securitySW);
    }

    async removeObject(object_id, id) {
        const object = await this.getById(object_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_object/', object);
    }

    async removeCriteriaObject(criteriaObject_id, id) {
        const criteriaObject = await this.getById(criteriaObject_id);
        return await axios.put(OBJECT_REST_API_URL + id + '/remove_criteria_object/', criteriaObject);
    }
}

export default new ObjectService();