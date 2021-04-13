const OBJECT_REST_API_URL = 'http://localhost:8081/api/scheme/5/relations'
const OBJECT_REST_API_URLц = 'http://localhost:8081/api/scheme/:id/infections'


class GraphService {

    getObjects(id) {
        return fetch(`http://localhost:8081/api/scheme/${id}/relations`)
            .then((res => {
                res.json();
                console.log(res);
            }));
    }
}

// react saga (есть на видосах), redux, redux-thunk  -- для запросов

export default new GraphService();