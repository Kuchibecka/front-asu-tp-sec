import axios from "axios";

const VIRUS_REST_API_URL = 'http://localhost:8081/api/virus/'

class VirusService {
    async create(data) {
        return await axios.post(VIRUS_REST_API_URL, data);
    }

    async getAll() {
        return await axios.get(VIRUS_REST_API_URL);
    }

    async getById(id) {
        return await axios.get(VIRUS_REST_API_URL + id);
    }

    async update(securitySW, id) {
        return await axios.put(VIRUS_REST_API_URL + id + '/edit/', securitySW);
    }

    async delete(id) {
        return await axios.delete(VIRUS_REST_API_URL + id + '/delete/');
    }

    async addExploit(exploit_id, id) {
        return await axios.put(VIRUS_REST_API_URL + id + '/add_exploit/' + exploit_id);
    }
}

export default new VirusService();