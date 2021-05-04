import axios from "axios";

const SECURITYSW_REST_API_URL = 'http://localhost:8081/api/securitysw/'

class SecuritySwService {
    async create(data) {
        return await axios.post(SECURITYSW_REST_API_URL, data);
    }

    async getAll() {
        return await axios.get(SECURITYSW_REST_API_URL);
    }

    async getById(id) {
        return await axios.get(SECURITYSW_REST_API_URL + id);
    }

    async update(securitySW, id) {
        return await axios.put(SECURITYSW_REST_API_URL + id + '/edit/', securitySW);
    }

    async delete(id) {
        return await axios.delete(SECURITYSW_REST_API_URL + id + '/delete/');
    }

    async addExploit(exploit_id, id) {
        return await axios.put(SECURITYSW_REST_API_URL + id + '/add_exploit/' + exploit_id);
    }

    async newInstance(id) {
        return await axios.post(SECURITYSW_REST_API_URL + 'new_instance/' + id);
    }
}

export default new SecuritySwService();