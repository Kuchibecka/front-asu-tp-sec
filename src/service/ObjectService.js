import axios from 'axios'
import defaultsDeep from 'lodash-es/defaultsDeep';

const OBJECT_REST_API_URL = 'http://localhost:8081/api/object/'

class ObjectService {

    getObjects() {
        return fetch(OBJECT_REST_API_URL)
            .then((res => res.json()));
    }
}

export default new ObjectService();