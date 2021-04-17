const OBJECT_REST_API_URL = 'http://localhost:8081/api/object/'

class ObjectService {

    getObjects() {
        return fetch(OBJECT_REST_API_URL)
            .then((res => res.json()));
    }

    createObject(data) {
        fetch('http://localhost:8081/api/object/new', {
            mode: 'no-cors',
            method: 'POST',
            body: data
        })
            .then(r => console.log(r))
    }
}

export default new ObjectService();