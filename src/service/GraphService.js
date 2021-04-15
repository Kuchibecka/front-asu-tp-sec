const OBJECT_REST_API_URL = 'http://localhost:8081/api/scheme/5/relations'
const OBJECT_REST_API_URLц = 'http://localhost:8081/api/scheme/:id/infections'


class GraphService {

    async getObjects(id) {
        const nodes = await
            fetch(`http://localhost:8081/api/scheme/${id}/nodes`)
        const rels = await
            fetch(`http://localhost:8081/api/scheme/${id}/relations`)
        const nodesJson = await nodes.json()
        const relsJson = await rels.json()

        const viruses = await
            fetch(`http://localhost:8081/api/scheme/${id}/viruses`)
        const infections = await
            fetch(`http://localhost:8081/api/scheme/${id}/infections`)
        const virusesJson = await viruses.json()
        const infectionsJson = await infections.json()

        const res = await nodesJson.concat(relsJson).concat(virusesJson).concat(infectionsJson)
        return res
    }
}


export default new GraphService();