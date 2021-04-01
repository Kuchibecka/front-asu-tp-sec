import axios from 'axios'
import defaultsDeep from 'lodash-es/defaultsDeep';

const OBJECT_REST_API_URL = 'http://localhost:8081/api/object/'

class ObjectService {

    fetchData = (url: string, options: any = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        return fetch(url, defaultsDeep(options, {
            headers,
        }));
    };

    getObjects() {
        axios.get(OBJECT_REST_API_URL).then((dataObject) => dataObject);
    }
}

export default new ObjectService();