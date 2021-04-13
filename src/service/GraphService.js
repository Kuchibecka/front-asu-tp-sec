const OBJECT_REST_API_URL = 'http://localhost:8081/api/scheme/5/relations'
const OBJECT_REST_API_URLц = 'http://localhost:8081/api/scheme/:id/infections'


class GraphService {

    getObjects(id) {
        return fetch(`http://localhost:8081/api/scheme/${id}/nodes`)
            .then((res => {
                return res.json();
            }));
    }
}


export default new GraphService();