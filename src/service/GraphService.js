import axios from "axios";

const SCHEME_REST_API_URL = 'http://localhost:8081/api/scheme/'

class GraphService {

    async getObjects(id) {
        const NODES_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/nodes'
        const RELATIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/relations'
        const VIRUSES_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/viruses'
        const INFECTIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/infections'
        const SECURITYSWS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/securitysws'
        const PROTECTIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/protections'
        
        // todo: раздельная загрузка для ускорения
        /*const a = await axios.get(NODES_REST_API_URL)
        const b = await axios.get(RELATIONS_REST_API_URL)
        const ab = await a.data.concat(b.data)*/

        const nodes = await
            axios.get(NODES_REST_API_URL)
        const rels = await
            axios.get(RELATIONS_REST_API_URL)
        const nodesJson = await nodes.data
        const relsJson = await rels.data

        const viruses = await
            axios.get(VIRUSES_REST_API_URL)
        const infections = await
            axios.get(INFECTIONS_REST_API_URL)
        const virusesJson = await viruses.data
        const infectionsJson = await infections.data

        const securitySWs = await
            axios.get(SECURITYSWS_REST_API_URL)
        const protections = await
            axios.get(PROTECTIONS_REST_API_URL)
        const securitySWsJson = await securitySWs.data
        const protectionsJson = await protections.data

        return await nodesJson.concat(relsJson).concat(virusesJson).concat(infectionsJson).concat(securitySWsJson).concat(protectionsJson)
    }

    async getTree(id){
        const TREE_NODES_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/fault_tree_nodes'
        const TREE_RELATIONS_REST_API_URL = SCHEME_REST_API_URL + id.toString() + '/fault_tree_relations'

        const treeNodes = await
            axios.get(TREE_NODES_REST_API_URL)
        const treeRels = await
            axios.get(TREE_RELATIONS_REST_API_URL)
        const treeNodesJson = await treeNodes.data
        const treeRelsJson = await treeRels.data

        return await treeNodesJson.concat(treeRelsJson)
    }

    async getSchemes() {
        return await axios.get(SCHEME_REST_API_URL);
    }
}


export default new GraphService();