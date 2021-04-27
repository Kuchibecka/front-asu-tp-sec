import axios from "axios";
import ObjectService from "./ObjectService";
import VirusService from "./VirusService";
import SecuritySWService from "./SecuritySWService";

const SCHEME_REST_API_URL = 'http://localhost:8081/api/scheme/'

class SchemeService {
    async create(data) {
        return await axios.post(SCHEME_REST_API_URL, data);
    }

    async get() {
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

    async addObject(object_id, id) {
        const object = await ObjectService.getById(object_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/add_object/', object);
    }

    async addVirus(virus_id, id) {
        const virus = await VirusService.getById(virus_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/add_virus/', virus);
    }

    async addSecuritySW(securitySW_id, id) {
        const securitySW = await SecuritySWService.getById(securitySW_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/add_securitysw/', securitySW);
    }

    async addCriteriaObject(criteriaObject_id, id) {
        const criteriaObject = await ObjectService.getById(criteriaObject_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/add_criteria_object/', criteriaObject);
    }

    async removeObject(object_id, id) {
        const object = await ObjectService.getById(object_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_object/', object);
    }

    async removeVirus(virus_id, id) {
        const virus = await VirusService.getById(virus_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_virus/', virus);
    }

    async removeSecuritySW(securitySW_id, id) {
        const securitySW = await SecuritySWService.getById(securitySW_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_securitysw/', securitySW);
    }

    async removeCriteriaObject(criteriaObject_id, id) {
        const criteriaObject = await ObjectService.getById(criteriaObject_id);
        return await axios.put(SCHEME_REST_API_URL + id + '/remove_criteria_object/', criteriaObject);
    }
}

export default new SchemeService();