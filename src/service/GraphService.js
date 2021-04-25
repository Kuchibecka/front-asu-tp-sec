import axios from "axios";

const SCHEME_REST_API_URL = 'http://localhost:8081/api/scheme/'

class GraphService {

    async getObjects(id) {
        const NODES_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/nodes'
        const RELATIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/relations'
        const VIRUSES_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/viruses'
        const INFECTIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/infections'
        // todo: добавить СЗИ на схему

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

        return await nodesJson.concat(relsJson).concat(virusesJson).concat(infectionsJson)
    }

    async getTree(id){
        const TREE_NODES_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/fault_tree_nodes'
        const TREE_RELATIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/fault_tree_relations'

        const treeNodes = await
            fetch(TREE_NODES_REST_API_URL)
        const treeRels = await
            fetch(TREE_RELATIONS_REST_API_URL)
        const treeNodesJson = await treeNodes.json()
        const treeRelsJson = await treeRels.json()

        return await treeNodesJson.concat(treeRelsJson)
    }

    async getSchemes() {
        return await axios.get(SCHEME_REST_API_URL);
    }
}


export default new GraphService();