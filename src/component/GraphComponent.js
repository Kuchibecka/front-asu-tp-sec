import ReactFlow from "react-flow-renderer";
import React from "react";
import GraphService from "../service/GraphService";

// todo: 1) react saga (есть на видосах), redux, redux-thunk  -- для запросов

// todo: 2.1) react router
// todo: 2.2) architecture

// todo: 3) css grid / flex


class GraphComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            graph: [],
            style: [],
        };
    }


    componentDidMount() {
        // выборка из браузерной строки
        // this.props.match(id) ? -> id param
        GraphService.getObjects(5)
            .then((res) => {
                this.setState({nodes: res});
                console.log("GraphComponent: ", this.state)
            });
        }

    render() {
    const graphStyles = {width: "100%", height: "500px"};

    // const BasicGraph = () => <ReactFlow elements={this.state.nodes} style={graphStyles}/>;

    // this.setState({graph: BasicGraph, style: graphStyles})
        return (
            <ReactFlow elements={this.state.nodes} style={graphStyles}/>
        )
    }
}

export default GraphComponent;

/*

class element {
    id
    data
    position

    constructor(id, data, position) {
        this.id = id;
        this.data = data;
        this.position = position;
    }
}

let graph = new Array();

this.nodes.forEach(function (item, i, nodes) {
    graph.push(
        element(
            item.id,
            item.data,
            item.position
        )
    )
});


const elements = [
    {
        id: "1",
        type: "input",
        data: {label: "Master Node"},
        position: {x: 50, y: 50}
    },
    {id: "2", data: {label: "Node 2"}, position: {x: 100, y: 100}},
    {id: "3", data: {label: "Node 3"}, position: {x: 250, y: 150}},
    {id: "4", data: {label: "Node 4"}, position: {x: 500, y: 200}},
    {id: "5", data: {label: "Node 5"}, position: {x: 750, y: 250}},
    {
        id: "6",
        data: {label: "Node 6"},
        position: {x: 800, y: 300},
        type: "output"
    },
    {id: "e1-2", source: "3", target: "2", type: "straight"},
    {id: "e1-3", source: "1", target: "3", type: "default"},
    {id: "e1-4", source: "1", target: "4", type: "default"},
    {id: "e1-5", source: "5", target: "2", type: "step", animated: true},
    {id: "e1-6", source: "1", target: "6", type: "step"}
];

const graphStyles = {width: "100%", height: "500px"};

const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles}/>;
*/



// Custom
// const customElement = [
//   {
//     id: "1",
//     style: {
//       background: "#454052",
//       width: 200,
//       color: "#fff",
//       fontSize: "20px",
//       fontFamily: "Helvetica",
//       boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)"
//     },
//     data: { label: "My custom node" },
//     position: { x: 500, y: 250 }
//   },
//   {
//     id: "2",
//     style: {
//       background: "#fff",
//       width: 400,
//       color: "#454052",
//       fontSize: "25px",
//       fontFamily: "Helvetica",
//       boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)"
//     },
//     data: { label: "My second custom node 😉" },
//     position: { x: 550, y: 300 }
//   }
// ];
