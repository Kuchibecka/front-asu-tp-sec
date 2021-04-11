const OBJECT_REST_API_URL = 'http://localhost:8081/api/object/'

class GraphService {

    getObjects() {
        return fetch(OBJECT_REST_API_URL)
            .then((res => {
                res.json();
                console.log(res);
            }));
    }
}

export default new GraphService();