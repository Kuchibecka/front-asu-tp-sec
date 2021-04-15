class GraphService {

    async getObjects(id) {
        const NODES_REST_API_URL = 'http://localhost:8081/api/scheme/' + id.toString() + '/nodes'
        const RELATIONS_REST_API_URL = 'http://localhost:8081/api/scheme/' + id.toString() + '/relations'
        const VIRUSES_REST_API_URL = 'http://localhost:8081/api/scheme/' + id.toString() + '/viruses'
        const INFECTIONS_REST_API_URL = 'http://localhost:8081/api/scheme/' + id.toString() + '/infections'

        const nodes = await
            fetch(NODES_REST_API_URL)
        const rels = await
            fetch(RELATIONS_REST_API_URL)
        const nodesJson = await nodes.json()
        const relsJson = await rels.json()

        const viruses = await
            fetch(VIRUSES_REST_API_URL)
        const infections = await
            fetch(INFECTIONS_REST_API_URL)
        const virusesJson = await viruses.json()
        const infectionsJson = await infections.json()

        const res = await nodesJson.concat(relsJson).concat(virusesJson).concat(infectionsJson)
        return res
    }
}


export default new GraphService();