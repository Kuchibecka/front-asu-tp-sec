import axios from "axios";

const OBJECT_REST_API_URL = 'http://localhost:8081/api/object/'

class ObjectService {

    getObjects() {
        return axios.get(OBJECT_REST_API_URL);
    }

    createObject(data) {
        return axios.post(OBJECT_REST_API_URL, data)
    }
}

export default new ObjectService();